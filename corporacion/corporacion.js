
/* =========================================================
   GRUPO CIC PERÚ
   CORPORACION.JS
   Página: Corporación
========================================================= */

"use strict";


/* =========================================================
   01. INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initCorporateCards();
    initCorporateImage();

});


/* =========================================================
   02. TARJETAS CORPORATIVAS
   Misión - Visión - Valores
========================================================= */

function initCorporateCards() {

    const cards =
        document.querySelectorAll(
            ".corporate-principles .card"
        );


    if (!cards.length) {
        return;
    }


    /*
       Añadimos tabindex para permitir que las tarjetas
       también puedan recibir foco mediante teclado.
    */

    cards.forEach((card) => {

        card.setAttribute(
            "tabindex",
            "0"
        );

    });

}


/* =========================================================
   03. IMAGEN CORPORATIVA
========================================================= */

function initCorporateImage() {

    const corporateImage =
        document.querySelector(
            ".corporate-image img"
        );


    if (!corporateImage) {
        return;
    }


    /*
       Si la imagen externa no puede cargarse,
       ocultamos únicamente la imagen rota.
       El contenedor se mantiene para no afectar
       abruptamente la estructura de la página.
    */

    corporateImage.addEventListener(
        "error",
        () => {

            corporateImage.style.display =
                "none";

            const imageContainer =
                corporateImage.closest(
                    ".corporate-image"
                );


            if (imageContainer) {

                imageContainer.classList.add(
                    "image-error"
                );

            }

        }
    );

}


/* =========================================================
   04. ANIMACIÓN DE ENTRADA
========================================================= */

const corporateObserver =
    "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        )
        : null;


/* =========================================================
   05. ELEMENTOS A OBSERVAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const elements =
            document.querySelectorAll(
                ".corporate-text, " +
                ".corporate-image, " +
                ".corporate-principles .card"
            );


        elements.forEach((element) => {

            element.classList.add(
                "corporate-reveal"
            );


            /*
               Si IntersectionObserver está disponible,
               esperamos a que el elemento aparezca
               en pantalla.
            */

            if (corporateObserver) {

                corporateObserver.observe(
                    element
                );

            } else {

                /*
                   Navegadores antiguos:
                   mostramos directamente.
                */

                element.classList.add(
                    "visible"
                );

            }

        });

    }
);


/* =========================================================
   FIN
   CORPORACION.JS
========================================================= */