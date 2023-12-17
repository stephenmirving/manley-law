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
  const officeWrappers = document.querySelectorAll('body.homepage .js-office-wrapper');

  const isHomepage = !!homepageHero;

  let hasFirstAnimClassBeenAdded = false;
  let hasSecondAnimClassBeenAdded = false;

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
    homepageHero.setAttribute(
      'style',
      `min-height:calc(100vh - ${navHeight}px);` +
      `min-height:calc(100lvh - ${navHeight}px);`
    );
  }

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

  function updateDomToggleDropdown(isTogglerChecked) {
    navMenuWrapper.hidden = !isTogglerChecked;
    navMenu.hidden = !isTogglerChecked;
    burgerBtn.setAttribute('aria-expanded', `${isTogglerChecked}`);
    navMenu.setAttribute('aria-expanded', `${isTogglerChecked}`);
    siteHeader.classList[isTogglerChecked ? 'add' : 'remove']('nav-dropdown-open');
  }

  function initialize() {
    const vWidth = window.innerWidth;

    toggleNavBurgerBtnDisplay(vWidth);

    if (isHomepage) {
      setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);

      applyAnimationWhenInView(); // Check on initial load in case the element is already in view
    }
  }

  function pageSetup() {
    initialize();

    if (isHomepage) {
      window.addEventListener('scroll', applyAnimationWhenInView, {passive: true});
    }

    window.addEventListener('resize', () => {
      const vWidth = window.innerWidth;

      navMenu.classList.add('anim-off');

      if (vWidth > mobileMaxWidth) {
        // Uncheck toggler
        navToggler.checked = false;
        // Trigger change event for the toggler's listener
        navToggler.dispatchEvent(new Event('change'));
      }

      if (isHomepage) {
        setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);
      }

      toggleNavBurgerBtnDisplay(vWidth);
    }, {passive: true});

    // Handle all pager click events
    document.body.addEventListener('click', (event) => {
      // Check if nav hamburger button is clicked and simulate a click on
      // the checkbox to toggle `checked` state
      if (event.target.id === 'nav-btn') {
        navMenu.classList.remove('anim-off');
        navToggler.click();
      } else if (navToggler.checked) {
        // Hide toggler menu if user clicks outside of it
        navToggler.click();
      }
    });

    // Listen for changes on the checkbox
    navToggler.addEventListener('change', () => {
      updateDomToggleDropdown(navToggler.checked);
    }, {passive: true});
  }

  if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', pageSetup, {passive: true});
  } else {
    // DOMContentLoaded has already fired
    pageSetup();
  }
})(window);
