// JavaScript: Manejo del Consentimiento de Cookies
document.addEventListener("DOMContentLoaded", function() {
    var cookieBanner = document.getElementById('cookie-banner');
    var acceptCookiesButton = document.getElementById('accept-cookies');

    // Comprueba si el usuario ya ha aceptado las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }

    acceptCookiesButton.addEventListener('click', function() {
        // Oculta el banner y almacena el consentimiento en localStorage
        cookieBanner.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');

        // Aquí puedes habilitar Google Analytics o cualquier otra función relacionada con cookies
        enableGoogleAnalytics();
    });

    function enableGoogleAnalytics() {
        // Activa Google Analytics solo si el usuario ha dado su consentimiento
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D9TFHRBXV8'); // Reemplaza con tu ID de seguimiento
    }

    // Activa Google Analytics inmediatamente si el consentimiento ya fue dado anteriormente
    if (localStorage.getItem('cookiesAccepted')) {
        enableGoogleAnalytics();
    }
});