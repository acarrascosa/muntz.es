$(document).ready(function() {
    var audio = document.getElementById('background-audio');
    var intro = document.getElementById('intro-audio');
    var soundIcon = document.getElementById('sound-icon');
    var isPlaying = false;

    soundIcon.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
			beepSound.pause();
			beepSound.currentTime = 0;
            soundIcon.src = '2024_files/media/sound-off.svg';
        } else {
            audio.play();
            soundIcon.src = '2024_files/media/sound-on.svg';
        }
        isPlaying = !isPlaying;
    });
	
	document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pausa el audio si la pestaña no es visible
            if (isPlaying) {
                audio.pause();
				beepSound.pause();
				beepSound.currentTime = 0;
                soundIcon.src = '2024_files/media/sound-off.svg';
            }
        } else {
            // Reanuda el audio si la pestaña es visible y estaba en reproducción
            if (isPlaying) {
                audio.play();
                soundIcon.src = '2024_files/media/sound-on.svg';
            }
        }
    });

    // Preloader functionality with Promises
    var preloader = document.getElementById('preloader');
    var loaderText = document.getElementById('loader-text');
    var images = document.images;
    var imagesTotalCount = images.length;
    var imagesLoadedCount = 0;
    var percDisplay = 0;
    var content = document.querySelector('.banner');
    var title = document.querySelector('.title');
    var botones = document.querySelector('.botones');
    var btnSpotify = document.querySelector('.btnSpotify');
    var btnYoutube = document.querySelector('.btnYoutube');
    var btnInstagram = document.querySelector('.btnInstagram');
    var btnEnter = document.querySelector('.btnEnter');

    var imagePromises = Array.from(images).map(function(img) {
        return new Promise(function(resolve, reject) {
            var imageClone = new Image();
            imageClone.onload = function() {
                imagesLoadedCount++;
                percDisplay = Math.floor((100 / imagesTotalCount) * imagesLoadedCount);
                loaderText.innerText = percDisplay + '%';
                resolve();
            };
            imageClone.onerror = function() {
                reject('Error loading image: ' + img.src);
            };
            imageClone.src = img.src;
        });
    });

    Promise.all(imagePromises).then(function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            loaderText.style.display = 'none';
            btnEnter.style.display = 'block';
            preloader.classList.add('fade-in');
        }, 1000);
    }).catch(function(error) {
    });

    btnEnter.addEventListener('click', function () {
        preloader.classList.add('fade-out');
        setTimeout(function () {
            intro.play();
            content.classList.add('fade-in');
            preloader.style.display = 'none';
            setTimeout(function () {
                title.classList.add('fade-in');
                setTimeout(function () {
                    title.classList.add('title-small');
                    botones.classList.add('show');
                    setTimeout(function () {
                        btnSpotify.classList.add('show');
                        setTimeout(function () {
                            btnYoutube.classList.add('show');
                            setTimeout(function () {
                                btnInstagram.classList.add('show');
                            }, 500);
                        }, 500);
                    }, 500);
                }, 3000);
            }, 5000);
        }, 1000);
    });

    // Nueva funcionalidad: modificar estilos y reproducir sonido al hacer clic en el álbum
    var beepSound = new Audio('2024_files/media/beep.mp3');
	beepSound.volume = 0.3;

});

document.addEventListener('gesturestart', function (e) {
    e.preventDefault(); // Deshabilitar el zoom por gesto
});

document.addEventListener('touchmove', function (e) {
    if (e.scale !== 1) { 
        e.preventDefault(); // Deshabilitar el zoom por pellizco
    }
}, { passive: false });

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

