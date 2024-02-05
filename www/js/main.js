// @ts-check
/**
 * @fileOverview Primary JavaScript file for the Manley & Halverstadt Law
 * website.
 *
 * This file contains the main JavaScript code for the website, including
 * DOM manipulation, event handling, and other functionality.
 *
 * @author Stephen M Irving
 * @version 1.0.8
 * @lastmodified 2021-02-003
 */
((window) => {
  'use strict';

  // Point at which non-mobile menu begins,
  // mobile menu (includes tablets) is < 821px
  const MOBILE_MAX_WIDTH = 821;
  // point at window.scrollY that the masthead should shrink
  // const MASTHEAD_SCROLL_BREAKPOINT = 182;
  // const MASTHEAD_SCROLL_BREAKPOINT = 182;
  // The multiplier in the masthead height calculation
  // The value the masthead should be shrunk by
  // const MASTHEAD_SIZE_MULTIPLE = 0.8;

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

  const isHomepage = window.location.pathname === '/';
  // TESTING: Need to use this version of isHomepage for testing,
  // comment the above line and uncomment the declaration below when in testing.
  // const isHomepage =
  //   window.location.pathname === '/' ||
  //   window.location.pathname === '/www/' ||
  //   window.location.pathname == '/www/index' ||
  //   window.location.pathname === '/www/index.html';

  let homepageHero, officeWrappers, scrollTransitionTimeout, resizeTimeout;

  // Get DOM elements only present on the homepage
  if (isHomepage) {
    homepageHero = document.querySelector('.hero');
    officeWrappers = document.querySelectorAll('.js-office-wrapper');
  }

  /**
   * Checks if a given element is a descendant of the given parent element.
   *
   * @param {HTMLElement} element - The element being checked.
   * @param {HTMLElement} parent - The element the function determines whether
   * or not is the parent of the first element passed.
   * @return {Boolean} True if the element is a descendant of the parent,
   * false if not.
   */
  function isDescendantOf(element, parent) {
    while (element) {
      if (element === parent) {
        return true;
      }
      element = element.parentElement;
    }

    return false;
  }

  /**
   * Checks if an element is inside the viewport.
   *
   * @param {HTMLElement} element - An HTML element from the DOM.
   * @return {Boolean} Returns true if the element is inside the viewport, false
   * if it is not.
   */
  function isElementInView(element) {
    const elementRectangle = element.getBoundingClientRect();

    return (
      elementRectangle.top <= window.innerHeight && elementRectangle.bottom >= 0
    );
  }

  /**
   * Applies the slide in animation on the office location wrappers when they
   * are visible on the screen.
   */
  function triggerSlideAnimationWhenInView() {
    if (window.scrollY < 50 || !officeWrappers) return;

    if (isElementInView(officeWrappers[0])) {
      officeWrappers[0].classList.add('move-in-left');
    }

    if (isElementInView(officeWrappers[1])) {
      officeWrappers[1].classList.add('move-in-right');
    }
  }

  /**
   * Toggles the display of the navbar hamburger button in the masthead based on
   * the width of the viewport. The breakpoint is determined by MOBILE_MAX_WIDTH.
   *
   * @param {Number} viewWidth - The current width of the viewport.
   */
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

  /**
   * Toggles the hamburger button's dropdown menu based on whether or not the
   * hidden checkbox in the nav, called the toggler, is checked.
   *
   * @param {Boolean} isTogglerChecked - Pass the .checked state of the checkbox
   * toggler.
   */
  function updateDomToggleDropdown(isTogglerChecked) {
    navMenuWrapper.hidden = !isTogglerChecked;
    navMenu.hidden = !isTogglerChecked;
    burgerBtn.setAttribute('aria-expanded', `${isTogglerChecked}`);
    navMenu.setAttribute('aria-expanded', `${isTogglerChecked}`);
    masthead.classList.toggle('nav-dropdown-open', isTogglerChecked);
  }

  /**
   * Reduces the opacity of the page when the user has the hamburger button's
   * dropdown menu open.
   *
   * @param {Boolean} isReduced - Pass true to toggle on reduced opacity. Pass
   * false to toggle off reduced opacity.
   */
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
      scrollPosition < 182 ? '1' : '0.8'
    );
  }

  /**
   * Applies the masthead height transition effect and updates the multiple that
   * is in the calculation used for the masthead height.
   */
  function mastheadScrollTransition() {
    const scrollPos = window.scrollY;

    if (scrollPos === 0) return;

    masthead.style = `transition:var(--masthead-scroll-transition)`;
    updateMastheadHeightMultiple(scrollPos);
  }

  /**
   * Sets up the page.
   *
   * @return {void}
   */
  function pageSetup() {
    // Remove any styling or effects specific to not having JavaScript enabled.
    // If any additional classes are added to the html element other than no-js,
    // this will have to be ammended to classList.remove('no-js');
    root.removeAttribute('class');

    // If the viewport width is less than MOBILE_MAX_WIDTH, display hamburger btn
    toggleNavBurgerBtnDisplay(window.innerWidth);

    // Deal with office location wrappers slide-in animation on homepage
    if (isHomepage) {
      // Check on initial load in case the element is already in view
      triggerSlideAnimationWhenInView();

      window.addEventListener('scroll', triggerSlideAnimationWhenInView, {
        passive: true
      });
    } else {
      window.removeEventListener('scroll', triggerSlideAnimationWhenInView, {
        passive: true
      });
    }

    clearTimeout(scrollTransitionTimeout);
    scrollTransitionTimeout = setTimeout(() => {
      window.addEventListener('scroll', mastheadScrollTransition, {
        passive: true
      });
    }, 500);

    // Handle page responsiveness during resize events
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
        triggerSlideAnimationWhenInView();

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

    setTimeout(() => {
      updateMastheadHeightMultiple(window.scrollY);
    }, 90);
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
