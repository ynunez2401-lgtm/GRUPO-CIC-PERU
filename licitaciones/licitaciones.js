/* =========================================================
   GRUPO CIC PERÚ
   LICITACIONES.JS
   Página: Licitaciones
========================================================= */

"use strict";


/* =========================================================
   01. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLicitacionesReveal();

});


/* =========================================================
   02. ANIMACIÓN DE ENTRADA
========================================================= */

function initLicitacionesReveal() {

    const content = document.querySelector(
        ".licitaciones-page .licitaciones-content"
    );


    if (!content) {
        return;
    }


    /* =====================================================
       ACCESIBILIDAD - MOVIMIENTO REDUCIDO
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        content.classList.add(
            "licitaciones-visible"
        );

        return;

    }


    /* =====================================================
       PREPARAR ANIMACIÓN
    ====================================================== */

    content.classList.add(
        "licitaciones-reveal"
    );


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
                            "licitaciones-visible"
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


        observer.observe(content);

        return;

    }


    /* =====================================================
       RESPALDO PARA NAVEGADORES ANTIGUOS
    ====================================================== */

    content.classList.add(
        "licitaciones-visible"
    );

}


/* =========================================================
   03. ESCAPE
========================================================= */

/*
   Si el menú responsive está abierto,
   su funcionamiento continúa siendo controlado
   por ../app.js.

   Este archivo no modifica la navegación general.
*/


/* =========================================================
   FIN LICITACIONES.JS
========================================================= */