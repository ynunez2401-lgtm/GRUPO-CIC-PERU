/* =========================================================
   GRUPO CIC PERÚ
   PROYECTOS.JS
   Página: Proyectos
========================================================= */

"use strict";


/* =========================================================
   01. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initProjectCards();
    initProjectReveal();
    initProjectResize();

});


/* =========================================================
   02. TARJETAS DE PROYECTOS
========================================================= */

function initProjectCards() {

    const cards = document.querySelectorAll(
        ".proyectos-page .card"
    );

    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {

        /* =================================================
           ACCESIBILIDAD
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
               En escritorio los efectos se controlan
               mediante :hover en proyectos.css.
            */

            if (window.innerWidth > 850) {
                return;
            }


            /*
               No interferir con enlaces o botones
               que puedan agregarse posteriormente.
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
                    "project-active"
                );


            /*
               Cerramos las demás tarjetas.
            */

            closeProjectCards(
                cards,
                card
            );


            /*
               Activar / desactivar.
            */

            if (isActive) {

                card.classList.remove(
                    "project-active"
                );

            } else {

                card.classList.add(
                    "project-active"
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


            if (window.innerWidth > 850) {
                return;
            }


            event.preventDefault();


            const isActive =
                card.classList.contains(
                    "project-active"
                );


            closeProjectCards(
                cards,
                card
            );


            if (isActive) {

                card.classList.remove(
                    "project-active"
                );

            } else {

                card.classList.add(
                    "project-active"
                );

            }

        });

    });


    /* =====================================================
       03. CERRAR AL TOCAR FUERA
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (window.innerWidth > 850) {
            return;
        }


        if (
            event.target.closest(
                ".proyectos-page .card"
            )
        ) {
            return;
        }


        closeProjectCards(cards);

    });


    /* =====================================================
       04. CERRAR CON ESCAPE
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeProjectCards(cards);


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
   05. CERRAR TARJETAS
========================================================= */

function closeProjectCards(
    cards,
    exception = null
) {

    cards.forEach((card) => {

        if (card === exception) {
            return;
        }


        card.classList.remove(
            "project-active"
        );

    });

}


/* =========================================================
   06. ANIMACIONES DE ENTRADA
========================================================= */

function initProjectReveal() {

    const cards = document.querySelectorAll(
        ".proyectos-page .card"
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
                "project-visible"
            );

        });

        return;

    }


    /* =====================================================
       PREPARAR ANIMACIONES
    ====================================================== */

    cards.forEach((card, index) => {

        card.classList.add(
            "project-reveal"
        );


        /*
           Entrada progresiva:

           Proyecto 1 = 0 ms
           Proyecto 2 = 100 ms
           Proyecto 3 = 200 ms
        */

        const delay =
            index * 100;


        card.style.setProperty(
            "--project-delay",
            `${delay}ms`
        );

    });


    /* =====================================================
       COMPATIBILIDAD
    ====================================================== */

    if (!("IntersectionObserver" in window)) {

        showAllProjectCards(cards);

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
                        "project-visible"
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
   07. MOSTRAR TODAS LAS TARJETAS
========================================================= */

function showAllProjectCards(cards) {

    cards.forEach((card) => {

        card.classList.add(
            "project-visible"
        );

    });

}


/* =========================================================
   08. CAMBIO DE TAMAÑO
========================================================= */

function initProjectResize() {

    let previousWidth =
        window.innerWidth;


    window.addEventListener("resize", () => {

        const currentWidth =
            window.innerWidth;


        /*
           Si únicamente cambia la altura,
           no hacemos nada.
        */

        if (currentWidth === previousWidth) {
            return;
        }


        previousWidth =
            currentWidth;


        /*
           Al regresar a escritorio eliminamos
           los estados táctiles.
        */

        if (currentWidth > 850) {

            const activeCards =
                document.querySelectorAll(
                    ".proyectos-page .card.project-active"
                );


            activeCards.forEach((card) => {

                card.classList.remove(
                    "project-active"
                );

            });

        }

    });

}


/* =========================================================
   09. EVITAR ARRASTRE ACCIDENTAL
========================================================= */

document.addEventListener("dragstart", (event) => {

    const projectCard =
        event.target.closest(
            ".proyectos-page .card"
        );


    if (!projectCard) {
        return;
    }


    if (event.target.tagName === "IMG") {

        event.preventDefault();

    }

});


/* =========================================================
   FIN PROYECTOS.JS
========================================================= */