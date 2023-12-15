((window) => {
  'use strict';

  const document = window.document;

  // Constants
  const mobileMaxWidth = 878;

  // DOM elements
  const navToggler = document.getElementById('nav-toggler');
  const burgerBtn = document.getElementById('nav-btn');
  const navWrapper = document.getElementById('nav-menu-wrapper');
  const navMenu = document.getElementById('nav-menu');

  function toggleNavBurgerBtnDisplay(viewWidth) {
    const isNavTogglerChecked = navToggler.checked;

    if (viewWidth < mobileMaxWidth) {
      navToggler.removeAttribute('disabled');
      burgerBtn.removeAttribute('disabled');
      burgerBtn.removeAttribute('hidden');
      burgerBtn.setAttribute('aria-hidden', 'false');

      if (!isNavTogglerChecked) {
        navWrapper.setAttribute('hidden', '');
        navMenu.setAttribute('hidden', '');
        navMenu.setAttribute('aria-expanded', 'false');
      }
    } else {
      navToggler.setAttribute('disabled', '');

      burgerBtn.setAttribute('disabled', '');
      burgerBtn.setAttribute('hidden', '');
      burgerBtn.setAttribute('aria-hidden', 'true');

      navWrapper.removeAttribute('hidden', '');

      navMenu.removeAttribute('hidden');
      navMenu.setAttribute('aria-expanded', 'true');
    }
  }

  // function updateDomOpenDropdown() {
    // navWrapper.removeAttribute('hidden');
    // navMenu.removeAttribute('hidden');
    // pageHeader.setAttribute('hidden', '');
    // burgerBtn.setAttribute('aria-expanded', 'true');
    // navMenu.setAttribute('aria-expanded', 'false');
  // }

  // function updateDomCloseDropdown() {
    // navWrapper.setAttribute('hidden', '');
    // navMenu.setAttribute('hidden', '');
    // burgerBtn.setAttribute('aria-expanded', 'false');
    // navMenu.setAttribute('aria-expanded', 'false');
  // }

  function initialize() {
    const vWidth = window.innerWidth;

    toggleNavBurgerBtnDisplay(vWidth);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initialize();

    // Handle clicks
    document.body.addEventListener('click', (event) => {
      // Check if nav hamburger button is clicked and simulate a click on
      // the checkbox to toggle `checked` state
      if (event.target.matches('#nav-btn, #nav-btn-icon')) {
        navToggler.click();
      }
    });

    window.addEventListener('resize', () => {
      const vWidth = window.innerWidth;

      if (vWidth > mobileMaxWidth) {
        // Uncheck toggler
        navToggler.checked = false;
        // Trigger change event for the toggler's listener
        navToggler.dispatchEvent(new Event('change'));
      }

      toggleNavBurgerBtnDisplay(vWidth);
    });

    // Listen for changes on the checkbox
    navToggler.addEventListener('change', () => {
      // navToggler.checked ? updateDomOpenDropdown() : updateDomCloseDropdown();
    });
  }, false);
})(window);
