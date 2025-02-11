document.querySelector('a[href="#inicio"]').addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.querySelector('#inicio');
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

document.querySelector('a[href="#projects"]').addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.querySelector('#projects');
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

document.querySelector('a[href="#curriculum"]').addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.querySelector('#curriculum');
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});