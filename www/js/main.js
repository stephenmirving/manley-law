// @ts-check

/**
 * @fileOverview JavaScript file for the Manley & Halverstadt Law website.
 *
 * This file contains the main JavaScript code for the website, including
 * DOM manipulation, event handling, and other functionality.
 */
((window) => {
  'use strict';
  const document = window.document;

  // Constants
  const MOBILE_MAX_WIDTH = 878;

  // DOM elements
  const masthead = document.querySelector('#masthead');
  const navToggler = masthead.querySelector('#nav-toggler');
  const burgerBtn = masthead.querySelector('#nav-btn');
  const navMenuWrapper = masthead.querySelector('#nav-menu-wrapper');
  const navMenu = masthead.querySelector('#nav-menu');
  const mainEl = document.querySelector('#main');
  const footer = document.querySelector('#footer');
  const isHomepage = !!document.querySelector('.homepage');

  let hasFirstAnimClassBeenAdded = false,
      hasSecondAnimClassBeenAdded = false,
      homepageHero,
      officeWrappers;

  if (isHomepage) {
    homepageHero = document.querySelector('.hero');
    officeWrappers = document.querySelectorAll('.js-office-wrapper');
  }

  function applyAnimationWhenInView() {
    const firstElemRect = officeWrappers[0].getBoundingClientRect();
    const secondElemRect = officeWrappers[1].getBoundingClientRect();

    const isFirstInView =
      firstElemRect.top <= window.innerHeight && firstElemRect.bottom >= 0;

    const isSecondInView =
      secondElemRect.top <= window.innerHeight && secondElemRect.bottom >= 0;

    if (isFirstInView && !hasFirstAnimClassBeenAdded) {
      officeWrappers[0]?.classList.add('move-in-left');
      hasFirstAnimClassBeenAdded = true;
    }

    if (isSecondInView && !hasSecondAnimClassBeenAdded) {
      officeWrappers[1]?.classList.add('move-in-right');
      hasSecondAnimClassBeenAdded = true;
    }
  }

  function setHeroSectionMinHeightStyle(navHeight) {
    navHeight /= 16; // Get value in rem

    homepageHero.setAttribute(
      'style',
      `min-height:calc(100vh - ${navHeight}rem);` +
        `min-height:calc(100svh - ${navHeight}rem);`
    );
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
    masthead.classList[isTogglerChecked ? 'add' : 'remove']('nav-dropdown-open');
  }

  function pageSetup() {
    if (isHomepage) {
      applyAnimationWhenInView(); // Check on initial load in case the element is already in view

      window.addEventListener(
        'scroll', applyAnimationWhenInView, { passive: true }
      );
    }

    toggleNavBurgerBtnDisplay(window.innerWidth);

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
          if (isHomepage) {
            homepageHero.classList.remove('reduce-opacity');
          }
          mainEl.classList.remove('reduce-opacity');
          footer.classList.remove('reduce-opacity');
        }

        toggleNavBurgerBtnDisplay(vWidth);

        if (isHomepage) {
          setHeroSectionMinHeightStyle(masthead.getBoundingClientRect().height);
        }
      },
      { passive: true }
    );

    // Handle all page click events
    document.body.addEventListener('click', (event) => {
      // Check if nav hamburger button is clicked and simulate a click on
      // the checkbox to toggle `checked` state
      // TODO: Clean up these nested ifs and write this section better
      if (event.target.id === 'nav-btn') {
        navMenu.classList.remove('anim-off');
        navToggler.click();
        if (navToggler.checked) {
          if (isHomepage) {
            homepageHero.classList.add('reduce-opacity');
          }
          mainEl.classList.add('reduce-opacity');
          footer.classList.add('reduce-opacity');
        } else {
          if (isHomepage) {
            homepageHero.classList.remove('reduce-opacity');
          }
          mainEl.classList.remove('reduce-opacity');
          footer.classList.remove('reduce-opacity');
        }
      } else if (navToggler.checked) {
        // Hide toggler menu if user clicks outside of it
        navToggler.click();
        if (isHomepage) {
          homepageHero.classList.remove('reduce-opacity');
        }
        mainEl.classList.remove('reduce-opacity');
        footer.classList.remove('reduce-opacity');
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

    if (isHomepage) {
      setHeroSectionMinHeightStyle(masthead.getBoundingClientRect().height);
    }
  }

  if (document.readyState === 'complete') {
    // DOMContentLoaded has already fired
    pageSetup();
    return;
  }
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', pageSetup, { passive: true });
})(window);
