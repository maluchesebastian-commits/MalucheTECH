/* =========================================================
   MalucheTECH — main.js
   Funcionalidades:
   1. Menú de navegación responsive (abrir/cerrar en móvil)
   2. Acordeón de preguntas frecuentes (FAQ)
   3. Animación de "escritura" en la terminal del hero
   4. Efecto de scroll en el header
   5. Validación y simulación de envío del formulario de contacto
   6. Año dinámico en el footer
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- 1. Menú responsive ---- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cierra el menú al hacer clic en un enlace (útil en móvil)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- 2. Acordeón FAQ ---- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Cierra los demás para un acordeón limpio (solo una respuesta abierta a la vez)
      faqItems.forEach((el) => {
        el.classList.remove("is-open");
        el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- 3. Animación de escritura en la terminal ---- */
  const typeTarget = document.getElementById("typeLine");

  if (typeTarget && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const commands = [
      'iniciar_proyecto --cliente="tu-empresa"',
      'desplegar_actualizacion --seguridad=on',
      'soporte_tecnico --disponibilidad=24/7'
    ];
    let commandIndex = 0;

    const typeCommand = (text, onDone) => {
      typeTarget.textContent = "";
      let charIndex = 0;
      const interval = setInterval(() => {
        typeTarget.textContent += text.charAt(charIndex);
        charIndex++;
        if (charIndex >= text.length) {
          clearInterval(interval);
          setTimeout(onDone, 1800);
        }
      }, 55);
    };

    const eraseCommand = (onDone) => {
      const interval = setInterval(() => {
        const current = typeTarget.textContent;
        typeTarget.textContent = current.slice(0, -1);
        if (current.length <= 1) {
          clearInterval(interval);
          onDone();
        }
      }, 25);
    };

    const loop = () => {
      typeCommand(commands[commandIndex], () => {
        eraseCommand(() => {
          commandIndex = (commandIndex + 1) % commands.length;
          loop();
        });
      });
    };

    loop();
  }

  /* ---- 4. Header con sombra al hacer scroll ---- */
  const header = document.querySelector(".site-header");
  const applyHeaderShadow = () => {
    if (window.scrollY > 8) {
      header.style.boxShadow = "0 8px 24px -18px rgba(18,18,18,.4)";
    } else {
      header.style.boxShadow = "none";
    }
  };
  applyHeaderShadow();
  window.addEventListener("scroll", applyHeaderShadow);

  /* ---- 5. Formulario de contacto ---- */
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nombre = contactForm.nombre.value.trim();
      const correo = contactForm.correo.value.trim();
      const mensaje = contactForm.mensaje.value.trim();

      if (!nombre || !correo || !mensaje) {
        formNote.textContent = "Por favor completa todos los campos antes de enviar.";
        return;
      }

      // Simulación de envío (este sitio es estático; aquí se integraría
      // un servicio real de correo o un backend en un proyecto en producción).
      formNote.style.color = "#1a8f4c";
      formNote.textContent = `¡Gracias, ${nombre}! Tu mensaje fue recibido, te contactaremos a ${correo} pronto.`;
      contactForm.reset();
    });
  }

  /* ---- 6. Año dinámico en el footer ---- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
