$(document).ready(function() {
    var intro = document.getElementById('intro-audio');
    var hasPlayed = true; // Variable para verificar si ya se reprodujo

    intro.addEventListener('ended', function () {
        // Cuando el audio termine de reproducirse, marcamos que ya ha sido reproducido
        hasPlayed = true;
    });

    document.addEventListener('visibilitychange', function () {
        if (!hasPlayed) { // Solo reproducir si aún no se ha reproducido completamente
            if (document.hidden) {
                intro.pause();
            } else {
                intro.play();
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
    // var botones = document.querySelector('.botones');
    var countdown = document.querySelector('.countdown');
    // var btnSpotify = document.querySelector('.btnSpotify');
    // var btnYoutube = document.querySelector('.btnYoutube');
    // var btnInstagram = document.querySelector('.btnInstagram');
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
        hasPlayed = false;
        preloader.classList.add('fade-out');
        setTimeout(function () {
            intro.play();
            content.classList.add('fade-in');
            preloader.classList.remove('fade-in');
            preloader.style.display = 'none';
            btnEnter.style.display = 'none';
            setTimeout(function () {
                title.classList.add('fade-in');
                setTimeout(function () {
                    title.classList.add('title-small');
                    // botones.classList.add('show');
                    countdown.classList.add('show');
                    // setTimeout(function () {
                    //     btnSpotify.classList.add('show');
                    //     setTimeout(function () {
                    //         btnYoutube.classList.add('show');
                    //         setTimeout(function () {
                    //             btnInstagram.classList.add('show');
                    //         }, 500);
                    //     }, 500);
                    // }, 500);
                }, 3000);
            }, 5000);
        }, 1000);
    });

    // Nueva funcionalidad: modificar estilos y reproducir sonido al hacer clic en el álbum
    var beepSound = new Audio('2024_files/media/beep.mp3');
	beepSound.volume = 0.3;

});

// JavaScript: Manejo del Consentimiento de Cookies
document.addEventListener("DOMContentLoaded", function() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);
    if (isMobile) {
        // document.getElementById("linkSpotify").href = "spotify:artist:4r8sQFACB010CoU30E9yio";
        document.getElementById("linkEfdi").href = "spotify:track:5Rt6EXjUzzhcQKeDTsN811";
        // document.getElementById("linkYoutube").href = "youtube://youtube.com/muntzband";
        // document.getElementById("linkInstagram").href = "instagram://user?username=muntzband";
    }
});

const targetDate = new Date("2024-12-13T00:00:00").getTime();

// Actualizar cada segundo
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // Calcular días, horas, minutos y segundos restantes
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Mostrar en el DOM
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // Detener cuando llegue a 0
    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown").style.display = "none";
        document.getElementById("spotify-button").style.display = "block";
    }
}, 1000);


