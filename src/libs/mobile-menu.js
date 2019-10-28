const MobileMenu = ({menuClass, menuButtonClass, sidebarClass, mobileMenuClass, overlayClass}) => {
    const body = document.body,
        menu = document.querySelector(menuClass),
        menuButton = document.querySelector(menuButtonClass),
        sidebar = document.querySelector(sidebarClass),
        mobileMenu = document.querySelector(mobileMenuClass),
        overlay = document.querySelector(overlayClass);

    const cloneMenu = menu.cloneNode(true);
    mobileMenu.appendChild(cloneMenu).className = '';

    const showMenu = () => {
        body.classList.add('no-scroll');
        sidebar.style.display = 'block';
        overlay.style.display = 'block';
    };
    const hideMenu = () => {
        body.classList.remove('no-scroll');
        sidebar.style.display = 'none';
        overlay.style.display = 'none';
    };

    menuButton.addEventListener('click', showMenu, false);
    overlay.addEventListener('click', hideMenu, false);
};
