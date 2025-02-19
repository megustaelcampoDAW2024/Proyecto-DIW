document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        var nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            if (window.innerWidth > 575) {
                nav.classList.add("bg-dark");
                nav.classList.remove("bg-transparent");
            }
        } else {
            if (window.innerWidth > 575) {
                nav.classList.remove("bg-dark");
                nav.classList.add("bg-transparent");
            }
        }
    });
});