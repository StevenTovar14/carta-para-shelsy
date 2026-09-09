
const openLetter = document.getElementById("openLetter");

const revealButton =
  document.getElementById("revealMessage");

const finalMessage =
  document.getElementById("finalMessage");

const heartsContainer =
  document.querySelector(".hearts");


/* =====================================================
   ABRIR CARTA
===================================================== */

openLetter.addEventListener("click", () => {

  const carta =
    document.getElementById("carta");

  carta.scrollIntoView({
    behavior: "smooth"
  });

  /*
    Cuando se abre la carta,
    aparecen algunos corazones.
  */

  createHearts(18);

});


/* =====================================================
   REVELAR MENSAJE FINAL
===================================================== */

revealButton.addEventListener("click", () => {

  /*
    Mostrar mensaje
  */

  finalMessage.classList.add("show");

  finalMessage.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
    Ocultar botón
  */

  revealButton.style.display = "none";


  /*
    Celebración con corazones
  */

  createHearts(35);

});


/* =====================================================
   CREAR CORAZONES
===================================================== */

function createHearts(amount = 10) {

  /*
    Verificamos que exista
    el contenedor.
  */

  if (!heartsContainer) {
    return;
  }


  /*
    Crear cada corazón
  */

  for (let i = 0; i < amount; i++) {

    const heart =
      document.createElement("span");


    /*
      Clase CSS
    */

    heart.className =
      "floating-heart";


    /*
      Elegir entre corazón lleno
      y corazón vacío.
    */

    heart.textContent =
      Math.random() > 0.35
        ? "♥"
        : "♡";


    /*
      Posición horizontal aleatoria
    */

    heart.style.left =
      `${Math.random() * 100}%`;


    /*
      Tamaño aleatorio
    */

    heart.style.fontSize =
      `${12 + Math.random() * 18}px`;


    /*
      Duración aleatoria
    */

    heart.style.animationDuration =
      `${4 + Math.random() * 5}s`;


    /*
      Retraso aleatorio
    */

    heart.style.animationDelay =
      `${Math.random() * 1.5}s`;


    /*
      Agregar al documento
    */

    heartsContainer.appendChild(heart);


    /*
      Eliminar después de la animación
      para no acumular elementos.
    */

    setTimeout(() => {

      heart.remove();

    }, 11000);

  }

}


/* =====================================================
   CORAZONES INICIALES
===================================================== */

window.addEventListener("load", () => {

  /*
    Esperamos un poco para que
    la página termine de cargar.
  */

  setTimeout(() => {

    createHearts(8);

  }, 700);

});


/* =====================================================
   GALERÍA DE FOTOS
===================================================== */

const photos = document.querySelectorAll(".memory-photo img");

const photoLightbox =
    document.getElementById("photoLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const lightboxCounter =
    document.getElementById("lightboxCounter");


let currentPhoto = 0;


/* =====================================================
   ABRIR FOTO
===================================================== */

photos.forEach((photo, index) => {

    photo.parentElement.addEventListener(
        "click",
        () => {

            currentPhoto = index;

            showPhoto(currentPhoto);

            photoLightbox.classList.add("show");

            photoLightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow = "hidden";

        }
    );

});


/* =====================================================
   MOSTRAR FOTO
===================================================== */

function showPhoto(index) {

    if (index < 0) {
        currentPhoto = photos.length - 1;
    }

    else if (index >= photos.length) {
        currentPhoto = 0;
    }

    else {
        currentPhoto = index;
    }


    lightboxImage.src =
        photos[currentPhoto].src;


    lightboxImage.alt =
        photos[currentPhoto].alt;


    lightboxCounter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;

}


/* =====================================================
   FOTO ANTERIOR
===================================================== */

lightboxPrev.addEventListener(
    "click",
    () => {

        showPhoto(currentPhoto - 1);

    }
);


/* =====================================================
   FOTO SIGUIENTE
===================================================== */

lightboxNext.addEventListener(
    "click",
    () => {

        showPhoto(currentPhoto + 1);

    }
);


/* =====================================================
   CERRAR
===================================================== */

function closeLightbox() {

    photoLightbox.classList.remove("show");

    photoLightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* Botón cerrar */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* =====================================================
   CERRAR AL TOCAR EL FONDO
===================================================== */

photoLightbox.addEventListener(
    "click",
    (event) => {

        if (event.target === photoLightbox) {
            closeLightbox();
        }

    }
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !photoLightbox.classList.contains("show")
        ) {
            return;
        }


        if (event.key === "Escape") {
            closeLightbox();
        }


        if (event.key === "ArrowLeft") {
            showPhoto(currentPhoto - 1);
        }


        if (event.key === "ArrowRight") {
            showPhoto(currentPhoto + 1);
        }

    }
);