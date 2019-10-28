const init = () => {
    // new Slider({
    //     slider: '.slider',
    //     sliderItems: '.slide',
    //     sliderBgs: '.slide__bg',
    //     sliderControls: '.slider-control',
    //     animationTime: 500,
    //     slideDelay: 6000,
    // });

    new MobileMenu({
        menuClass: '.main--nav .nav',
        menuButtonClass: '.button--menu',
        sidebarClass: '.sidebar-menu',
        mobileMenuClass: '.mobile-menu',
        overlayClass: '.overlay',
    });
};

window.onload = init;
