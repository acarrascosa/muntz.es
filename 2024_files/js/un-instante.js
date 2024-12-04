document.addEventListener("DOMContentLoaded", function () {
    function fadeOutAndChangeText(element, newText, duration) {
        element.style.transition = `opacity ${duration / 2}ms ease`;
        element.style.opacity = "0"; // Fade out

        setTimeout(() => {
            element.textContent = newText; // Change text
            element.style.opacity = "1"; // Fade in
        }, duration / 2);
    }

    setTimeout(() => {
        const bannerContent = document.querySelector(".banner .content");
        if (bannerContent) {
            fadeOutAndChangeText(bannerContent, "me salí del papel otra vez...", 2000);
        }

        setTimeout(() => {
            if (bannerContent) {
                fadeOutAndChangeText(bannerContent, "03·01·2025", 2000);
            }
        }, 8000);
    }, 15000);
});
