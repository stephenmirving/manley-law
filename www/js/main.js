((window) => {
  'use strict';

  const document = window.document;

  // Constants
  const mobileMaxWidth = 878;

  // DOM elements
  const navToggler = document.getElementById('nav-toggler');
  const burgerBtn = document.getElementById('nav-btn');
  const siteHeader = document.getElementById('site-head');
  const navMenuWrapper = document.getElementById('nav-menu-wrapper');
  const navMenu = document.getElementById('nav-menu');
  const homepageHero = document.querySelector('.homepage > .hero');

  function setHeroSectionMinHeightStyle(navHeight) {
    homepageHero.setAttribute(
      'style',
      `min-height:calc(100vh - ${navHeight}px);` +
      `min-height:calc(100lvh - ${navHeight}px);`
    );
  }

  // function removeInlineStyle(element) {
  //   element.removeAttribute('style');
  // }

  function toggleNavBurgerBtnDisplay(viewWidth) {
    const isNavTogglerChecked = navToggler.checked;

    if (viewWidth < mobileMaxWidth) {
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

  // function updateDomOpenDropdown() {
    // navMenuWrapper.removeAttribute('hidden');
    // navMenu.removeAttribute('hidden');
    // pageHeader.setAttribute('hidden', '');
    // burgerBtn.setAttribute('aria-expanded', 'true');
    // navMenu.setAttribute('aria-expanded', 'false');
  // }

  // function updateDomCloseDropdown() {
    // navMenuWrapper.setAttribute('hidden', '');
    // navMenu.setAttribute('hidden', '');
    // burgerBtn.setAttribute('aria-expanded', 'false');
    // navMenu.setAttribute('aria-expanded', 'false');
  // }

  function initialize() {
    const vWidth = window.innerWidth;

    toggleNavBurgerBtnDisplay(vWidth);

    if (homepageHero) {
      setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);
    }
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

      if (homepageHero) {
        setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);
      }

      toggleNavBurgerBtnDisplay(vWidth);
    });

    // Listen for changes on the checkbox
    navToggler.addEventListener('change', () => {
      // navToggler.checked ? updateDomOpenDropdown() : updateDomCloseDropdown();
    });
  }, false);
})(window);
