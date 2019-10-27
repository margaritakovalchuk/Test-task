const Slider = ({ slider, sliderItems, sliderBgs, sliderControls, animationTime = 500, slideDelay = 6000 }) => {
    let $slider = document.querySelector(slider),
        $slideItems = document.querySelectorAll(sliderItems),
        $slideBGs = document.querySelectorAll(sliderBgs),
        $controls = document.querySelectorAll(sliderControls),
        $controlLeft = document.querySelectorAll(`${sliderControls}.left`),
        $controlRight = document.querySelectorAll(`${sliderControls}.right`),
        diff = 0,
        curSlide = 0,
        numOfSlides = $slideItems.length - 1,
        animating = false,
        animTime = animationTime,
        autoSlideTimeout,
        autoSlideDelay = slideDelay;

    function manageControls() {
        $controls.forEach(element => {
            element.classList.remove('inactive');
        });
        if (!curSlide) {
            $controlLeft.classList.add("inactive");
        }
        if (curSlide === numOfSlides) {
            $controlRight.classList.add('inactive');
        }
    }

    function autoSlide() {
        autoSlideTimeout = setTimeout(() => {
            curSlide++;
            if (curSlide > numOfSlides) {
                curSlide = 0;
            }
            changeSlides();
        }, autoSlideDelay);
    }

    function changeSlides(instant) {
        if (!instant) {
            animating = true;
            manageControls();
            $slider.classList.add('animating');
            $slideItems.forEach(element => {
                element.classList.remove('active');
            });
            document.querySelectorAll(`.slide-${curSlide}`).forEach(element => {
                element.classList.add('active');
            });
            setTimeout(function () {
                $slider.classList.remove('animating');
                animating = false;
            }, animTime);
        }

        window.clearTimeout(autoSlideTimeout);
        $slider.style.transform = `translate3d(${-curSlide * 100}%,0,0)`;
        $slideBGs.forEach(element => {
            element.style.transform = `translate3d(${curSlide * 50}%,0,0)`;
        });
        diff = 0;
        autoSlide();
    }

    function navigateLeft() {
        if (animating) {
            return;
        }
        if (curSlide > 0) {
            curSlide--;
        }
        changeSlides();
    }

    function navigateRight() {
        if (animating) {
            return;
        }
        if (curSlide < numOfSlides) {
            curSlide++;
        }
        changeSlides();
    }
    let startX;
    let winW = window.innerWidth;

    function actionMove (event) {
        const x = event.pageX || event.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) {
            diff /= 2;
        }
        $slider.style.transform = `translate3d(${(-curSlide*100 - diff)}%,0,0)`;
        $slideBGs.forEach(element => {
            element.style.transform = `translate3d(${(curSlide*50 + diff/2)}%,0,0)`;
        });
    }

    function actionStart (event) {
        if (animating) {
            return;
        }
        window.clearTimeout(autoSlideTimeout);
        startX = event.pageX || event.originalEvent.touches[0].pageX,

            diff = 0;

        window.addEventListener('mousemove', actionMove, false);
        window.addEventListener('touchmove', actionMove, false);
    }

    $slider.addEventListener('mousedown', actionStart, false);
    $slider.addEventListener('touchstart', actionStart, false);

    function actionEnd () {
        window.removeEventListener('mousemove', actionMove);
        window.removeEventListener('touchmove', actionMove);

        if (animating) {
            return;
        }
        if (!diff) {
            changeSlides(true);
            return;
        }
        if (diff > -8 && diff < 8) {
            changeSlides();
            return;
        }
        if (diff <= -8) {
            navigateLeft();
        }
        if (diff >= 8) {
            navigateRight();
        }
    }

    window.addEventListener('mouseup', actionEnd, false);
    window.addEventListener('touchend', actionEnd, false);

    $controls.forEach(element => {
        element.addEventListener('click', () => {
            if(element.classList.contains('left')) {
                navigateLeft();
            } else {
                navigateRight();
            }
        })
    });
};
