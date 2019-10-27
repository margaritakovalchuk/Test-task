const init = () => {
    new Slider({
        slider: '.slider',
        sliderItems: '.slide',
        sliderBgs: '.slide__bg',
        sliderControls: '.slider-control',
        animationTime: 500,
        slideDelay: 6000,
    });
};

window.onload = init;
