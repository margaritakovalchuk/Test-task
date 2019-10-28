const init = () => {
    new MobileMenu({
        menuClass: '.header--nav .nav',
        menuButtonClass: '.nav--button',
        sidebarClass: '.sidebar-menu',
        mobileMenuClass: '.mobile-menu',
        overlayClass: '.overlay',
    });
};

window.onload = init;
