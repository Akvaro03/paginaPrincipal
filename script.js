ScrollReveal().reveal('#titulo', { delay: 100, reset: true });
ScrollReveal().reveal('#titulo2222', { delay: 300, reset: true });
ScrollReveal().reveal('.cardHr', { delay: 600, reset: true });
ScrollReveal().reveal('.subtitulo2', { delay: 850, reset: true }); 
ScrollReveal().reveal('#divFoto', { delay: 1100, reset: true }); 
ScrollReveal().reveal('#divcode', { delay: 1100, reset: true }); 
ScrollReveal().reveal('#cartas', { delay: 1100, reset: true }); 
ScrollReveal().reveal('.titulo2', { delay: 300, reset: true });
ScrollReveal().reveal('#institucion', { delay: 500, reset: true });

ScrollReveal().reveal('.email', { delay: 600, reset: true });
ScrollReveal().reveal('.asunto', { delay: 950, reset: true });
ScrollReveal().reveal('.telefono', { delay: 1100, reset: true }); 
ScrollReveal().reveal('.mensaje', { delay: 1200, reset: true });
ScrollReveal().reveal('.botton-div', { delay: 1500, reset: true });


let test = document.getElementById("miniCard");

// This handler will be executed only once when the cursor
// moves over the unordered list
(function () {
    emailjs.init("user_jzR3ajQIIeAmGJaDHvzPU");
})();




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


function validaForm() {
    // Campos de texto
    if ($("#email").val() == "") {
        alert("El campo email no puede estar vacío.");
        $("#email").focus(); // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if ($("#name").val() == "") {
        alert("El campo nombre no puede estar vacío.");
        $("#name").focus();
        return false;
    }
    if ($("#tel").val() == "") {
        alert("El campo telefono no puede estar vacío.");
        $("#tel").focus();
        return false;
    }

    if ($("#message").val() == "") {
        alert("El campo mensaje no puede estar vacío.");
        $("#message").focus();
        return false;
    }


    return true; // Si todo está correcto
}


function sendmail() {
    if (validaForm()) {
        let fullName = document.getElementById("name").value;
        let userEmail = document.getElementById("email").value;
        let usertel = document.getElementById("email").value;
        let userMessage = document.getElementById("message").value;
        var contactParams = {
                from_name: fullName,
                from_email: userEmail,
                from_tel: usertel,
                message: userMessage,
                to_name: "Alvaro"
            }
    
        emailjs.send(`service_y9i5rvb`, `template_3eh6ygj`, contactParams).then(function(res){
            prompt("logrado")
        })    
    }
}
