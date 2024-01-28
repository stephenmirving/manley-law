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
  // mobile menu (includes tablets) is < 878px
  const MOBILE_MAX_WIDTH = 878;

  const document = window.document;

  // DOM elements
  const masthead = document.getElementById('masthead');
  const navToggler = masthead.querySelector('#nav-toggler');
  const burgerBtn = masthead.querySelector('#nav-btn');
  const navMenuWrapper = masthead.querySelector('#nav-menu-wrapper');
  const navMenu = masthead.querySelector('#nav-menu');
  const mastheadLogo = masthead.querySelector('#masthead-logo');
  const mainEl = document.getElementById('main');
  const footer = document.getElementById('footer');
  const isHomepage = !!document.getElementById('homepage');

  let homepageHero, officeWrappers;

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

  function pageSetup() {
    toggleNavBurgerBtnDisplay(window.innerWidth);

    if (isHomepage) {
      // Check on initial load in case the element is already in view
      applyAnimationWhenInView();

      window.addEventListener('scroll', applyAnimationWhenInView, {
        passive: true
      });
    }

    window.addEventListener('scroll', (event) => {
      mastheadLogo.style =
        ``
    }, { passive: true });


    window.addEventListener(
      'resize',
      () => {
        const vWidth = window.innerWidth;

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
