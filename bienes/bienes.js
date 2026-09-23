/* =========================================================
   GRUPO CIC PERÚ
   BIENES.JS
   Página: Bienes
========================================================= */

"use strict";


/* =========================================================
   01. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initBienesCards();
    initBienesReveal();
    initBienesResize();

});


/* =========================================================
   02. TARJETAS
========================================================= */

function initBienesCards() {

    const cards = document.querySelectorAll(
        ".bienes-page .card"
    );

    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {

        /* =============================================
           ACCESIBILIDAD
        ============================================= */

        if (!card.hasAttribute("tabindex")) {

            card.setAttribute(
                "tabindex",
                "0"
            );

        }


        /* =============================================
           CLICK / TOUCH
        ============================================= */

        card.addEventListener("click", (event) => {

            /*
               En escritorio los efectos se controlan
               mediante :hover en bienes.css.
            */

            if (window.innerWidth > 850) {
                return;
            }


            /*
               Si posteriormente agregamos enlaces o
               botones dentro de una tarjeta, este JS
               no bloqueará su funcionamiento.
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
                    "bien-active"
                );


            /*
               Cerramos las demás tarjetas.
            */

            closeBienesCards(
                cards,
                card
            );


            /*
               Activar / desactivar tarjeta seleccionada.
            */

            if (isActive) {

                card.classList.remove(
                    "bien-active"
                );

            } else {

                card.classList.add(
                    "bien-active"
                );

            }

        });


        /* =============================================
           ENTER / ESPACIO
        ============================================= */

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
                    "bien-active"
                );


            closeBienesCards(
                cards,
                card
            );


            if (isActive) {

                card.classList.remove(
                    "bien-active"
                );

            } else {

                card.classList.add(
                    "bien-active"
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


        /*
           Si se tocó una tarjeta, la interacción ya
           fue gestionada anteriormente.
        */

        if (
            event.target.closest(
                ".bienes-page .card"
            )
        ) {
            return;
        }


        closeBienesCards(cards);

    });


    /* =====================================================
       04. CERRAR CON ESCAPE
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeBienesCards(cards);


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

function closeBienesCards(
    cards,
    exception = null
) {

    cards.forEach((card) => {

        if (card === exception) {
            return;
        }


        card.classList.remove(
            "bien-active"
        );

    });

}


/* =========================================================
   06. ANIMACIONES AL HACER SCROLL
========================================================= */

function initBienesReveal() {

    const cards = document.querySelectorAll(
        ".bienes-page .card"
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
                "bien-visible"
            );

        });

        return;

    }


    /* =====================================================
       PREPARAR TARJETAS
    ====================================================== */

    cards.forEach((card, index) => {

        card.classList.add(
            "bien-reveal"
        );


        /*
           Aparición progresiva:
           0 ms
           90 ms
           180 ms
           270 ms
        */

        const delay =
            index * 90;


        card.style.setProperty(
            "--bien-delay",
            `${delay}ms`
        );

    });


    /* =====================================================
       COMPATIBILIDAD
    ====================================================== */

    if (!("IntersectionObserver" in window)) {

        showAllBienesCards(cards);

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
                        "bien-visible"
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

function showAllBienesCards(cards) {

    cards.forEach((card) => {

        card.classList.add(
            "bien-visible"
        );

    });

}


/* =========================================================
   08. CAMBIO DE TAMAÑO DE PANTALLA
========================================================= */

function initBienesResize() {

    let previousWidth =
        window.innerWidth;


    window.addEventListener("resize", () => {

        const currentWidth =
            window.innerWidth;


        /*
           Si únicamente cambió la altura,
           no ejecutamos nuevamente.
        */

        if (currentWidth === previousWidth) {
            return;
        }


        previousWidth =
            currentWidth;


        /*
           Cuando pasamos de móvil/tablet a escritorio,
           eliminamos estados táctiles.
        */

        if (currentWidth > 850) {

            const activeCards =
                document.querySelectorAll(
                    ".bienes-page .card.bien-active"
                );


            activeCards.forEach((card) => {

                card.classList.remove(
                    "bien-active"
                );

            });

        }

    });

}


/* =========================================================
   09. EVITAR ARRASTRE ACCIDENTAL
========================================================= */

document.addEventListener("dragstart", (event) => {

    const card =
        event.target.closest(
            ".bienes-page .card"
        );


    if (!card) {
        return;
    }


    if (event.target.tagName === "IMG") {

        event.preventDefault();

    }

});


/* =========================================================
   FIN
   BIENES.JS
========================================================= */