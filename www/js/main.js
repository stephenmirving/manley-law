// @ts-check
/**
 * @fileOverview JavaScript file for the Manley & Halverstadt Law website.
 *
 * This file contains the main JavaScript code for the website, including
 * DOM manipulation, event handling, and other functionality.
 */
((window) => {
  'use strict';
  // Point at which non-mobile menu begins,
  // mobile menu (includes tablets) is < 821px
  const MOBILE_MAX_WIDTH = 821;
  const MASTHEAD_SCROLL_BREAKPOINT = 140;
  const MASTHEAD_SIZE_MULTIPLE = 0.8;

  const document = window.document;

  // DOM elements
  const root = document.documentElement;
  const masthead = document.getElementById('masthead');
  const navToggler = masthead.querySelector('#nav-toggler');
  const burgerBtn = masthead.querySelector('#nav-btn');
  const navMenuWrapper = masthead.querySelector('#nav-menu-wrapper');
  const navMenu = masthead.querySelector('#nav-menu');
  const brandSubhead = masthead.querySelector('#brand-subhead');
  const mainEl = document.getElementById('main');
  const footer = document.getElementById('footer');
  const isHomepage = !!document.getElementById('homepage');

  let homepageHero,
      officeWrappers,
      resizeTimeout;

  if (isHomepage) {
    homepageHero = document.querySelector('.hero');
    officeWrappers = document.querySelectorAll('.js-office-wrapper');
  }

  function isDescendantOf(element, parent) {
    while (element) {
      if (element === parent) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

  function applyAnimationWhenInView() {
    if (window.scrollY < 50) return;

    const firstElemRect = officeWrappers[0].getBoundingClientRect();
    const secondElemRect = officeWrappers[1].getBoundingClientRect();

    const isFirstInView =
      firstElemRect.top <= window.innerHeight && firstElemRect.bottom >= 0;

    const isSecondInView =
      secondElemRect.top <= window.innerHeight && secondElemRect.bottom >= 0;

    if (isFirstInView) {
      officeWrappers[0].classList.add('move-in-left');
    }

    if (isSecondInView) {
      officeWrappers[1].classList.add('move-in-right');
    }
  }

  function toggleNavBurgerBtnDisplay(viewWidth) {
    const isNavTogglerChecked = navToggler.checked;

    if (viewWidth < MOBILE_MAX_WIDTH) {
      navToggler.removeAttribute('disabled');
      burgerBtn.removeAttribute('disabled');
      burgerBtn.removeAttribute('hidden');
      burgerBtn.setAttribute('aria-hidden', 'false');

      if (!isNavTogglerChecked) {
        navMenuWrapper.setAttribute('hidden', '');
        navMenu.setAttribute('hidden', '');
        navMenu.setAttribute('aria-expanded', 'false');
      }
    } else {
      navToggler.setAttribute('disabled', '');
      burgerBtn.setAttribute('disabled', '');
      burgerBtn.setAttribute('hidden', '');
      burgerBtn.setAttribute('aria-hidden', 'true');
      navMenuWrapper.removeAttribute('hidden', '');
      navMenu.removeAttribute('hidden');
      navMenu.setAttribute('aria-expanded', 'true');
    }
  }

  function updateDomToggleDropdown(isTogglerChecked) {
    navMenuWrapper.hidden = !isTogglerChecked;
    navMenu.hidden = !isTogglerChecked;
    burgerBtn.setAttribute('aria-expanded', `${isTogglerChecked}`);
    navMenu.setAttribute('aria-expanded', `${isTogglerChecked}`);
    masthead.classList.toggle('nav-dropdown-open', isTogglerChecked);
  }

  function toggleReducePageOpacity(isReduced) {
    if (isHomepage) {
      homepageHero.classList.toggle('reduce-opacity', isReduced);
    }
    mainEl.classList.toggle('reduce-opacity', isReduced);
    footer.classList.toggle('reduce-opacity', isReduced);
  }

  /**
   * Updates the multiple in the calculation of the masthead height based on
   * the user's scroll position.
   *
   * @param {Number} scrollPosition - window.scrollY.
   */
  function updateMastheadHeightMultiple(scrollPosition) {
    root.style.setProperty(
      '--masthead-height-multiple',
      scrollPosition < MASTHEAD_SCROLL_BREAKPOINT ? '1' : MASTHEAD_SIZE_MULTIPLE
    );
  }

  function mastheadScrollTransition() {
    const scrollPos = window.scrollY;

    if (scrollPos === 0) return;

    masthead.style = `transition:var(--masthead-scroll-transition)`;
    updateMastheadHeightMultiple(scrollPos);
  }

  function pageSetup() {
    toggleNavBurgerBtnDisplay(window.innerWidth);

    if (isHomepage) {
      // Check on initial load in case the element is already in view
      applyAnimationWhenInView();

      window.addEventListener('scroll', applyAnimationWhenInView, {
        passive: true
      });
    }

    updateMastheadHeightMultiple(window.scrollY);
    window.addEventListener('scroll', mastheadScrollTransition, {
      passive: true
    });

    window.addEventListener(
      'resize',
      () => {
        const vWidth = window.innerWidth;

        clearTimeout(resizeTimeout);
        masthead.removeAttribute('style');
        brandSubhead.style = 'transition:none';

        navMenu.classList.add('anim-off');

        if (vWidth > MOBILE_MAX_WIDTH) {
          // Uncheck toggler
          navToggler.checked = false;
          // Trigger change event for the toggler's listener
          navToggler.dispatchEvent(new Event('change'));
          toggleReducePageOpacity(false);
        }

        toggleNavBurgerBtnDisplay(vWidth);
        applyAnimationWhenInView();

        resizeTimeout = setTimeout(() => {
          brandSubhead.removeAttribute('style');
        }, 800);
      },
      { passive: true }
    );

    // Handle all page click events
    document.body.addEventListener('click', (event) => {
      // Check if nav hamburger button is clicked and simulate a click on
      // the checkbox to toggle `checked` state
      if (event.target.id === 'nav-btn') {
        event.preventDefault();
        event.stopPropagation();
        navMenu.classList.remove('anim-off');
        navToggler.click();
        toggleReducePageOpacity(navToggler.checked);
      } else if (navToggler.checked) {
        event.stopPropagation();
        // Hide toggler menu if user clicks outside of it
        navToggler.click();
        toggleReducePageOpacity(false);
      }
    });

    // Listen for changes on the checkbox
    navToggler.addEventListener(
      'change',
      () => {
        updateDomToggleDropdown(navToggler.checked);
      },
      { passive: true }
    );

    document.addEventListener(
      'focusin',
      (event) => {
        if (
          navToggler.checked &&
          !isDescendantOf(event.target, navMenuWrapper)
        ) {
          navToggler.click();
          toggleReducePageOpacity(false);
        }
      },
      { passive: true }
    );
  }

  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    // DOMContentLoaded has already fired
    pageSetup();
    return;
  }
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', pageSetup, { passive: true });
})(window);
