/* =========================================================
   GRUPO CIC PERÚ
   APP.JS
   Página principal
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURACIÓN GENERAL
========================================================= */

const CONFIG = {

    /* WhatsApp de Grupo CIC PERÚ */
    whatsappNumber: "51945340444",

    /* Mensaje del botón flotante */
    whatsappDefaultMessage:
        "Hola, quiero información sobre Grupo CIC PERÚ.",

    /* Punto donde cambia de menú móvil a escritorio */
    mobileBreakpoint: 850

};


/* =========================================================
   02. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initWhatsAppButton();
    initContactModal();
    initContactForm();

});


/* =========================================================
   03. MENÚ RESPONSIVE
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (!menuToggle || !mainNav) {
        return;
    }


    /* =====================================================
       ABRIR / CERRAR MENÚ
    ====================================================== */

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("open");


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Cerrar menú"
                    : "Abrir menú"
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    /* =====================================================
       CERRAR AL SELECCIONAR UNA OPCIÓN
    ====================================================== */

    const menuLinks =
        mainNav.querySelectorAll("a");


    menuLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu(
                    menuToggle,
                    mainNav
                );

            }
        );

    });


    /* =====================================================
       CERRAR CON ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mainNav.classList.contains("open")
            ) {

                closeMobileMenu(
                    menuToggle,
                    mainNav
                );

            }

        }
    );


    /* =====================================================
       CERRAR AL CAMBIAR A ESCRITORIO
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                CONFIG.mobileBreakpoint
            ) {

                closeMobileMenu(
                    menuToggle,
                    mainNav
                );

            }

        }
    );

}


/* =========================================================
   04. CERRAR MENÚ MÓVIL
========================================================= */

function closeMobileMenu(
    menuToggle,
    mainNav
) {

    if (!menuToggle || !mainNav) {
        return;
    }


    mainNav.classList.remove(
        "open"
    );


    menuToggle.classList.remove(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   05. BOTÓN FLOTANTE WHATSAPP
========================================================= */

function initWhatsAppButton() {

    const whatsappButton =
        document.querySelector(".whatsapp");


    if (!whatsappButton) {
        return;
    }


    whatsappButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            const whatsappURL =
                createWhatsAppURL(
                    CONFIG.whatsappDefaultMessage
                );


            openWhatsApp(
                whatsappURL
            );

        }
    );

}


/* =========================================================
   06. MODAL DE CONTACTO
========================================================= */

function initContactModal() {

    const openModalButton =
        document.getElementById(
            "openModal"
        );

    const closeModalButton =
        document.getElementById(
            "closeModal"
        );

    const modal =
        document.getElementById(
            "contactModal"
        );


    if (
        !openModalButton ||
        !closeModalButton ||
        !modal
    ) {

        return;

    }


    /* =====================================================
       ABRIR MODAL
    ====================================================== */

    openModalButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openContactModal(
                modal
            );

        }
    );


    /* =====================================================
       CERRAR CON X
    ====================================================== */

    closeModalButton.addEventListener(
        "click",
        () => {

            closeContactModal(
                modal
            );

        }
    );


    /* =====================================================
       CERRAR AL TOCAR FUERA
    ====================================================== */

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeContactModal(
                    modal
                );

            }

        }
    );


    /* =====================================================
       CERRAR CON ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeContactModal(
                    modal
                );

            }

        }
    );

}


/* =========================================================
   07. ABRIR MODAL
========================================================= */

function openContactModal(modal) {

    if (!modal) {
        return;
    }


    modal.style.display =
        "block";


    document.body.classList.add(
        "modal-open"
    );


    requestAnimationFrame(() => {

        modal.classList.add(
            "show"
        );

    });


    /* =====================================================
       COLOCAR CURSOR EN NOMBRE
    ====================================================== */

    const nombreInput =
        document.getElementById(
            "nombre"
        );


    if (nombreInput) {

        setTimeout(() => {

            nombreInput.focus();

        }, 200);

    }

}


/* =========================================================
   08. CERRAR MODAL
========================================================= */

function closeContactModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );


    setTimeout(() => {

        modal.style.display =
            "none";

    }, 200);

}


/* =========================================================
   09. FORMULARIO → WHATSAPP
========================================================= */

function initContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /* =================================================
               VALIDACIÓN HTML
            ================================================= */

            if (
                !contactForm.checkValidity()
            ) {

                contactForm.reportValidity();

                return;

            }


            /* =================================================
               OBTENER CAMPOS
            ================================================= */

            const nombreInput =
                document.getElementById(
                    "nombre"
                );

            const emailInput =
                document.getElementById(
                    "email"
                );

            const telefonoInput =
                document.getElementById(
                    "telefono"
                );

            const mensajeInput =
                document.getElementById(
                    "mensaje"
                );


            if (
                !nombreInput ||
                !emailInput ||
                !telefonoInput ||
                !mensajeInput
            ) {

                return;

            }


            /* =================================================
               OBTENER DATOS
            ================================================= */

            const nombre =
                nombreInput.value.trim();

            const email =
                emailInput.value.trim();

            const telefono =
                telefonoInput.value.trim();

            const mensaje =
                mensajeInput.value.trim();


            /* =================================================
               VALIDACIÓN ADICIONAL
            ================================================= */

            if (
                nombre === "" ||
                email === "" ||
                mensaje === ""
            ) {

                contactForm.reportValidity();

                return;

            }


            /* =================================================
               MENSAJE QUE RECIBIRÁS EN WHATSAPP
            ================================================= */

            const mensajeWhatsApp =
`Hola, Grupo CIC PERÚ.

Quisiera solicitar información a través de su página web.

👤 Nombre: ${nombre}
📧 Correo: ${email}
📱 Teléfono: ${telefono || "No indicado"}

💬 Mensaje:
${mensaje}

Muchas gracias.`;


            /* =================================================
               CREAR URL
            ================================================= */

            const whatsappURL =
                createWhatsAppURL(
                    mensajeWhatsApp
                );


            /* =================================================
               ABRIR WHATSAPP
            ================================================= */

            openWhatsApp(
                whatsappURL
            );


            /* =================================================
               CERRAR MODAL
            ================================================= */

            const modal =
                document.getElementById(
                    "contactModal"
                );


            if (modal) {

                closeContactModal(
                    modal
                );

            }


            /*
                NO usamos reset() aquí.

                Así, si la persona vuelve desde WhatsApp,
                los datos permanecen en el formulario.
            */

        }
    );

}


/* =========================================================
   10. CREAR URL DE WHATSAPP
========================================================= */

function createWhatsAppURL(message) {

    const encodedMessage =
        encodeURIComponent(
            message
        );


    return (
        "https://wa.me/" +
        CONFIG.whatsappNumber +
        "?text=" +
        encodedMessage
    );

}


/* =========================================================
   11. ABRIR WHATSAPP
========================================================= */

function openWhatsApp(url) {

    /*
        Detectamos teléfonos y tablets.
    */

    const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );


    /* =====================================================
       CELULAR
    ====================================================== */

    if (isMobile) {

        window.location.href =
            url;

        return;

    }


    /* =====================================================
       PC / MAC
    ====================================================== */

    const whatsappWindow =
        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );


    /*
        Si Safari, Chrome u otro navegador
        bloquea la pestaña nueva, usamos
        la misma pestaña.
    */

    if (!whatsappWindow) {

        window.location.href =
            url;

    }

}


/* =========================================================
   FIN
   GRUPO CIC PERÚ
========================================================= */