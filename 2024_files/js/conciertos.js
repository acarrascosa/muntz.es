document.addEventListener("DOMContentLoaded", function () {
    const concertLinks = document.querySelectorAll(".concert-list li a");

    concertLinks.forEach(link => {
        const concertDate = link.getAttribute("data-fecha");

        if (concertDate) {
            const concertDateObj = new Date(concertDate);
            const currentDate = new Date();

            if (currentDate > concertDateObj) {
                link.classList.add("disabled");
                link.removeAttribute("href");
            }
        }
    });
});
