document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        var nav = document.querySelector("nav");
        var navCollapse = document.querySelector('.navbar-collapse');
        if (window.scrollY > 50) {
            if (window.innerWidth > 575) {
                nav.classList.add("bg-dark");
            }
        } else {
            if(window.innerWidth > 575) {
                nav.classList.remove("bg-dark");
                nav.classList.add("bg-transparent");
            }
        }
        // Collapse navbar when scrolling
        if (navCollapse.classList.contains('show')) {
            navCollapse.classList.remove('show');
        }
    });

    // Collapse navbar when a link is clicked
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            var navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
            }
        });
    });
});