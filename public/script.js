ScrollReveal().reveal('#titulo', { delay: 100, reset: true });
ScrollReveal().reveal('#titulo2222', { delay: 300, reset: true });
ScrollReveal().reveal('.cardHr', { delay: 600, reset: true });
ScrollReveal().reveal('.subtitulo2', { delay: 850, reset: true });
ScrollReveal().reveal('.titulo2', { delay: 300, reset: true });
ScrollReveal().reveal('#institucion', { delay: 500, reset: true });

let test = document.getElementById("miniCard");

// This handler will be executed only once when the cursor
// moves over the unordered list
(function () {
    emailjs.init("user_jzR3ajQIIeAmGJaDHvzPU");
})();

function sendmail() {
        let fullName = document.getElementById("name").value;
        let userEmail = document.getElementById("email").value;
        let userMessage = document.getElementById("message").value;
        var contactParams = {
                from_name: fullName,
                from_email: userEmail,
                message: userMessage,
                to_name: "Alvaro"
            }

        emailjs.send(`service_y9i5rvb`, `template_3eh6ygj`, contactParams).then(function(res){console.log(`holaa`)})
    }



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
    if ($("#asunto").val() == "") {
        alert("El campo asunto no puede estar vacío.");
        $("#asunto").focus();
        return false;
    }
    if ($("#mensaje").val() == "") {
        alert("El campo mensaje no puede estar vacío.");
        $("#mensaje").focus();
        return false;
    }

    return true; // Si todo está correcto
}

$(document).ready(function() { // Esta parte del código se ejecutará automáticamente cuando la página esté lista.
    $("#botonenviar").click(function() { // Con esto establecemos la acción por defecto de nuestro botón de enviar.
        if (validaForm()) { // Primero validará el formulario.
            $.ajax({
                type: "POST",
                url: "https://klimarios.herokuapp.com/contact",
                data: $("#formdata").serialize(),
                success: function(res) {
                    alert(res);
                }
            })
        }
    });
});