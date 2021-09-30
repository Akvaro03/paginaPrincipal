ScrollReveal().reveal('#titulo', { delay: 100, reset: true });
ScrollReveal().reveal('#titulo2222', { delay: 300, reset: true });
ScrollReveal().reveal('.cardHr', { delay: 600, reset: true });
ScrollReveal().reveal('.subtitulo2', { delay: 850, reset: true });
ScrollReveal().reveal('.titulo2', { delay: 300, reset: true });
ScrollReveal().reveal('#institucion', { delay: 500, reset: true });

let test = document.getElementById("miniCard");

// This handler will be executed only once when the cursor
// moves over the unordered list


$('.cards').on('scrollSpy:enter', function() {
    console.log('enter: hola');
    $('.navbar').addClass("fondo").removeClass("mask-custom");
    $('.nav-link').addClass("letras");
});

$('.cards').on('scrollSpy:exit', function() {
    console.log('exit: chau');
    $('.navbar').removeClass("fondo").addClass("mask-custom");
    $('.nav-link').removeClass("letras");
});

$('.cards').scrollSpy();