let header = document.querySelector('header');
let lastScrollY = window.scrollY;
let video = document.querySelector('#myVideo');

window.addEventListener('scroll', () => {
    if (![...header.classList].includes('site-navigation')) {
        if (lastScrollY < window.scrollY) {
            header.classList.add('nav-hidden');

        } else {
            header.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY
    }



    header.classList.toggle('site-header-active', window.scrollY > 0);
});