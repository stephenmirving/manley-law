((window) => {
  'use strict';

  const document = window.document;

  // Constants
  const mobileMaxWidth = 878;

  function init() {
    // DOM elements
    const navToggler = document.getElementById('nav-toggler');
    const burgerBtn = document.getElementById('nav-btn');
    const siteHeader = document.getElementById('site-head');
    const navMenuWrapper = document.getElementById('nav-menu-wrapper');
    const navMenu = document.getElementById('nav-menu');
    const homepageHero = document.querySelector('body.homepage > .hero');
    const officeTitles = document.querySelectorAll('.contact__office-title');
    const officeWrappers = document.querySelectorAll('body.homepage .js-office-wrapper');

    let hasClassBeenAdded = false;

    function applyAnimationWhenInView() {
      const firstTitleRect = officeTitles[0].getBoundingClientRect();
      const isInView =
        firstTitleRect.top <= window.innerHeight && firstTitleRect.bottom >= 0;

      if (isInView && !hasClassBeenAdded) {
        officeWrappers[0]?.classList.add('move-in-left');
        officeWrappers[1]?.classList.add('move-in-right');
        hasClassBeenAdded = true;
      }
    }

    function setHeroSectionMinHeightStyle(navHeight) {
      homepageHero.setAttribute(
        'style',
        `min-height:calc(100vh - ${navHeight}px);` +
        `min-height:calc(100lvh - ${navHeight}px);`
      );
    }

    function toggleNavBurgerBtnDisplay(viewWidth) {
      const isNavTogglerChecked = navToggler.checked;

      if (viewWidth < mobileMaxWidth) {
        navToggler.disabled = false;
        burgerBtn.disabled = false;
        burgerBtn.hidden = false;
        burgerBtn.setAttribute('aria-hidden', 'false');

        if (!isNavTogglerChecked) {
          navMenuWrapper.hidden = true;
          navMenu.hidden = true;
          navMenu.setAttribute('aria-expanded', 'false');
        }
      } else {
        navToggler.disabled = true;
        burgerBtn.disabled = true;
        burgerBtn.hidden = true;
        burgerBtn.setAttribute('aria-hidden', 'true');
        navMenuWrapper.hidden = false;
        navMenu.hidden = false;
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

    function domSetup() {
      const vWidth = window.innerWidth;

      toggleNavBurgerBtnDisplay(vWidth);

      if (homepageHero) {
        setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);
      }

      applyAnimationWhenInView(); // Check on initial load in case the element is already in view
    }

    domSetup();

    window.addEventListener('scroll', applyAnimationWhenInView);

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

    // Handle clicks
    document.body.addEventListener('click', (event) => {
      // Check if nav hamburger button is clicked and simulate a click on
      // the checkbox to toggle `checked` state
      if (event.target.matches('#nav-btn, #nav-btn-icon')) {
        navToggler.click();
      }
    });

    // Listen for changes on the checkbox
    navToggler.addEventListener('change', () => {
      // navToggler.checked ? updateDomOpenDropdown() : updateDomCloseDropdown();
    });
  }

  // Ensure DOMContentLoaded did not fire before script runs
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
