const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');
const preloader = document.getElementById('preloader');

// Toggle para abrir/cerrar menú y cambiar el icono
menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    menuButton.classList.toggle('active');

    // Cambia entre íconos de "hamburguesa" y "cerrar"
    const icon = menuButton.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Detectar si el dispositivo es móvil
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);

    if (isMobile) {
        const socialLinks = document.querySelector('.social-links');

        // Modificar enlaces para dispositivos móviles
        const links = socialLinks.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');

            if (href.includes('spotify.com')) {
                link.setAttribute('href', 'spotify:artist:4r8sQFACB010CoU30E9yio');
            } else if (href.includes('youtube.com')) {
                link.setAttribute('href', 'youtube://youtube.com/muntzband');
            } else if (href.includes('instagram.com')) {
                link.setAttribute('href', 'instagram://user?username=muntzband');
            } else if (href.includes('x.com')) {
                link.setAttribute('href', 'twitter://user?screen_name=muntzband');
            }
        });
    }
});
