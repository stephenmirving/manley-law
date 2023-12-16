
((window) => {
  'use strict';

  const document = window.document;

  // Constants
  const mobileMaxWidth = 878;

  function init() {
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
      homepageHero.style.minHeight = `calc(100vh - ${navHeight}px)`;
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

    function domSetup() {
      const vWidth = window.innerWidth;

      toggleNavBurgerBtnDisplay(vWidth);

      if (homepageHero) {
        setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);
      }

      applyAnimationWhenInView();
    }

    domSetup();

    window.addEventListener('scroll', applyAnimationWhenInView);

    window.addEventListener('resize', () => {
      const vWidth = window.innerWidth;

      if (vWidth > mobileMaxWidth) {
        navToggler.checked = false;
        navToggler.dispatchEvent(new Event('change'));
      }

      if (homepageHero) {
        setHeroSectionMinHeightStyle(siteHeader.getBoundingClientRect().height);
      }

      toggleNavBurgerBtnDisplay(vWidth);
    });

    document.body.addEventListener('click', (event) => {
      if (event.target.matches('#nav-btn, #nav-btn-icon')) {
        navToggler.click();
      }
    });

    navToggler.addEventListener('change', () => {
      // No-Op
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
