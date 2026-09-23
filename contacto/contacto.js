/* =========================================================
   GRUPO CIC PERÚ
   CONTACTO.JS
   Página: Contacto
========================================================= */

"use strict";


/* =========================================================
   01. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initContactCards();
    initContactReveal();
    initContactKeyboard();

});


/* =========================================================
   02. CONFIGURAR TARJETAS
========================================================= */

function initContactCards() {

    const cards = document.querySelectorAll(
        ".contacto-page .contact-info-card"
    );

    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {

        /*
           Las tarjetas que ya son enlaces <a>
           reciben foco automáticamente.

           La tarjeta de ubicación es un <div>,
           por eso comprobamos su tabindex.
        */

        if (
            card.tagName !== "A" &&
            !card.hasAttribute("tabindex")
        ) {
            card.setAttribute("tabindex", "0");
        }

    });

}


/* =========================================================
   03. ANIMACIÓN DE ENTRADA
========================================================= */

function initContactReveal() {

    const cards = document.querySelectorAll(
        ".contacto-page .contact-info-card"
    );


    if (!cards.length) {
        return;
    }


    /* =====================================================
       MOVIMIENTO REDUCIDO
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        cards.forEach((card) => {

            card.classList.add(
                "contact-visible"
            );

        });

        return;

    }


    /* =====================================================
       PREPARAR TARJETAS
    ====================================================== */

    cards.forEach((card, index) => {

        card.classList.add(
            "contact-reveal"
        );


        /*
           Aparición progresiva:
           Correo -> Teléfono -> Ubicación
        */

        card.style.transitionDelay =
            `${index * 100}ms`;

    });


    /* =====================================================
       INTERSECTION OBSERVER
    ====================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                (entries, currentObserver) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "contact-visible"
                        );


                        currentObserver.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.15,

                    rootMargin:
                        "0px 0px -20px 0px"
                }

            );


        cards.forEach((card) => {

            observer.observe(card);

        });


        return;

    }


    /* =====================================================
       RESPALDO PARA NAVEGADORES ANTIGUOS
    ====================================================== */

    cards.forEach((card) => {

        card.classList.add(
            "contact-visible"
        );

    });

}


/* =========================================================
   04. NAVEGACIÓN POR TECLADO
========================================================= */

function initContactKeyboard() {

    const cards = document.querySelectorAll(
        ".contacto-page .contact-info-card"
    );


    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {

        card.addEventListener(
            "keydown",
            (event) => {

                /*
                   Los enlaces de Correo y Teléfono
                   ya funcionan nativamente con Enter.
                */

                if (card.tagName === "A") {
                    return;
                }


                /*
                   La tarjeta Ubicación no ejecuta
                   ninguna acción porque actualmente
                   solo muestra "Lima, Perú".
                */

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                }

            }
        );

    });

}


/* =========================================================
   05. FINALIZAR ANIMACIÓN
========================================================= */

document.addEventListener(
    "transitionend",
    (event) => {

        const card =
            event.target.closest(
                ".contact-info-card"
            );


        if (!card) {
            return;
        }


        if (
            !card.classList.contains(
                "contact-visible"
            )
        ) {
            return;
        }


        card.style.transitionDelay = "";

    }
);


/* =========================================================
   06. ESTADO AL PRESIONAR
========================================================= */

document.addEventListener(
    "pointerdown",
    (event) => {

        const card =
            event.target.closest(
                ".contact-info-link"
            );


        if (!card) {
            return;
        }


        card.classList.add(
            "contact-pressed"
        );

    }
);


document.addEventListener(
    "pointerup",
    removePressedState
);


document.addEventListener(
    "pointercancel",
    removePressedState
);


document.addEventListener(
    "pointerleave",
    removePressedState
);


/* =========================================================
   07. QUITAR ESTADO PRESIONADO
========================================================= */

function removePressedState() {

    const pressedCards =
        document.querySelectorAll(
            ".contacto-page .contact-pressed"
        );


    pressedCards.forEach((card) => {

        card.classList.remove(
            "contact-pressed"
        );

    });

}


/* =========================================================
   FIN CONTACTO.JS
========================================================= */