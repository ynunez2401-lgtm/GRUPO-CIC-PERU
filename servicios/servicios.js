/* =========================================================
   GRUPO CIC PERÚ
   SERVICIOS.JS
   Página: Servicios
========================================================= */

"use strict";


/* =========================================================
   01. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initServiceCards();
    initServiceReveal();
    initServiceResize();

});


/* =========================================================
   02. TARJETAS DE SERVICIOS
========================================================= */

function initServiceCards() {

    const cards = document.querySelectorAll(
        ".servicios-page .card"
    );


    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {


        /* =================================================
           HACER TARJETA ACCESIBLE CON TECLADO
        ================================================= */

        if (!card.hasAttribute("tabindex")) {

            card.setAttribute(
                "tabindex",
                "0"
            );

        }


        /* =================================================
           CLICK / TOUCH
        ================================================= */

        card.addEventListener("click", (event) => {

            /*
               En escritorio el efecto se controla
               mediante :hover en CSS.
            */

            if (window.innerWidth > 850) {
                return;
            }


            /*
               Evita interferir si en el futuro se coloca
               un enlace o botón dentro de una tarjeta.
            */

            if (
                event.target.closest(
                    "a, button, input, textarea, select"
                )
            ) {
                return;
            }


            const isActive =
                card.classList.contains(
                    "service-active"
                );


            /*
               Cerramos las demás tarjetas.
            */

            closeServiceCards(
                cards,
                card
            );


            /*
               Activamos/desactivamos la seleccionada.
            */

            if (isActive) {

                card.classList.remove(
                    "service-active"
                );

            } else {

                card.classList.add(
                    "service-active"
                );

            }

        });


        /* =================================================
           ENTER / ESPACIO
        ================================================= */

        card.addEventListener("keydown", (event) => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {
                return;
            }


            /*
               Solo necesitamos activación manual
               en tablet/celular.
            */

            if (window.innerWidth > 850) {
                return;
            }


            event.preventDefault();


            const isActive =
                card.classList.contains(
                    "service-active"
                );


            closeServiceCards(
                cards,
                card
            );


            if (isActive) {

                card.classList.remove(
                    "service-active"
                );

            } else {

                card.classList.add(
                    "service-active"
                );

            }

        });

    });


    /* =====================================================
       CERRAR AL TOCAR FUERA
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (window.innerWidth > 850) {
            return;
        }


        /*
           Si tocó una tarjeta, no cerramos aquí.
        */

        if (
            event.target.closest(
                ".servicios-page .card"
            )
        ) {
            return;
        }


        closeServiceCards(cards);

    });


    /* =====================================================
       ESCAPE
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeServiceCards(cards);


        /*
           Quitamos el foco de una tarjeta
           si actualmente lo tiene.
        */

        const activeElement =
            document.activeElement;


        if (
            activeElement &&
            activeElement.classList &&
            activeElement.classList.contains("card")
        ) {

            activeElement.blur();

        }

    });

}


/* =========================================================
   03. CERRAR TARJETAS
========================================================= */

function closeServiceCards(
    cards,
    exception = null
) {

    cards.forEach((card) => {

        if (card === exception) {
            return;
        }


        card.classList.remove(
            "service-active"
        );

    });

}


/* =========================================================
   04. ANIMACIÓN AL HACER SCROLL
========================================================= */

function initServiceReveal() {

    const cards = document.querySelectorAll(
        ".servicios-page .card"
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
                "service-visible"
            );

        });

        return;

    }


    /* =====================================================
       PREPARAR TARJETAS
    ====================================================== */

    cards.forEach((card, index) => {

        card.classList.add(
            "service-reveal"
        );


        /*
           Animación progresiva.

           Primera tarjeta: 0ms
           Segunda: 90ms
           Tercera: 180ms

           Segunda fila vuelve a iniciar.
        */

        const position =
            index % 3;


        const delay =
            position * 90;


        card.style.setProperty(
            "--service-delay",
            `${delay}ms`
        );

    });


    /* =====================================================
       COMPATIBILIDAD CON NAVEGADORES ANTIGUOS
    ====================================================== */

    if (!("IntersectionObserver" in window)) {

        showAllServiceCards(cards);

        return;

    }


    /* =====================================================
       OBSERVADOR
    ====================================================== */

    const observer =
        new IntersectionObserver(

            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "service-visible"
                    );


                    currentObserver.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    cards.forEach((card) => {

        observer.observe(card);

    });

}


/* =========================================================
   05. MOSTRAR TODAS LAS TARJETAS
========================================================= */

function showAllServiceCards(cards) {

    cards.forEach((card) => {

        card.classList.add(
            "service-visible"
        );

    });

}


/* =========================================================
   06. CAMBIO DE TAMAÑO
========================================================= */

function initServiceResize() {

    let previousWidth =
        window.innerWidth;


    window.addEventListener("resize", () => {

        const currentWidth =
            window.innerWidth;


        /*
           Evitamos ejecutar innecesariamente
           cuando solo cambia la altura.
        */

        if (currentWidth === previousWidth) {
            return;
        }


        previousWidth =
            currentWidth;


        /*
           Si pasamos de móvil/tablet a escritorio,
           eliminamos los estados táctiles.
        */

        if (currentWidth > 850) {

            const activeCards =
                document.querySelectorAll(
                    ".servicios-page .card.service-active"
                );


            activeCards.forEach((card) => {

                card.classList.remove(
                    "service-active"
                );

            });

        }

    });

}


/* =========================================================
   07. EVITAR IMÁGENES ARRASTRABLES
========================================================= */

document.addEventListener("dragstart", (event) => {

    const serviceCard =
        event.target.closest(
            ".servicios-page .card"
        );


    if (!serviceCard) {
        return;
    }


    if (
        event.target.tagName === "IMG"
    ) {

        event.preventDefault();

    }

});


/* =========================================================
   FIN SERVICIOS.JS
========================================================= */