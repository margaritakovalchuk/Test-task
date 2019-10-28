const init = () => {
    new MobileMenu({
        menuClass: '.main--nav .nav',
        menuButtonClass: '.button--menu',
        sidebarClass: '.sidebar-menu',
        mobileMenuClass: '.mobile-menu',
        overlayClass: '.overlay',
    });
};

window.onload = init;
