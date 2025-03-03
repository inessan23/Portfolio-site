/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", function () {
  var openGifButtons = document.querySelectorAll(".openGif"); // Sélectionne tous les boutons Play
  var mainContent = document.querySelector(".main-content");

  openGifButtons.forEach(function (button) {
      button.addEventListener("click", function () {
          var targetId = this.getAttribute("data-target");
          var gifOverlay = document.getElementById(targetId);

          console.log("Clic détecté sur:", targetId); // Debugging

          if (gifOverlay) {
              gifOverlay.style.display = "flex";
              if (mainContent) {
                  mainContent.classList.add("blur");
              }
          } else {
              console.error("Aucun élément trouvé avec l'ID :", targetId); // Debugging
          }
      });
  });

  var closeOverlayButtons = document.querySelectorAll(".close-overlay");

  closeOverlayButtons.forEach(function (button) {
      button.addEventListener("click", function () {
          var overlay = this.closest(".gif-overlay");
          console.log("Fermeture de l'overlay"); // Debugging
          if (overlay) {
              overlay.style.display = "none";
          }
          if (mainContent) {
              mainContent.classList.remove("blur");
          }
      });
  });

  var gifOverlays = document.querySelectorAll(".gif-overlay");

  gifOverlays.forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
          if (e.target === overlay) {
              console.log("Fermeture en cliquant en dehors du GIF"); // Debugging
              overlay.style.display = "none";
              if (mainContent) {
                  mainContent.classList.remove("blur");
              }
          }
      });
  });

  // Debugging: Vérifie les éléments présents dans le DOM
  console.log("Liste des éléments du portfolio détectés :");
  document.querySelectorAll(".portfolio-item").forEach(function(item, index) {
      console.log(`Élément ${index + 1}:`, item.innerHTML);
  });
});

// --------------maillot retro----------
document.addEventListener("DOMContentLoaded", function () {
  var openGifMaillot = document.querySelector(".openGif[data-target='gifOverlayMaillot']");
  var gifOverlayMaillot = document.getElementById("gifOverlayMaillot");
  var closeOverlayMaillot = gifOverlayMaillot.querySelector(".close-overlay");
  var mainContent = document.querySelector(".main-content");

  if (openGifMaillot && gifOverlayMaillot) {
      openGifMaillot.addEventListener("click", function () {
          console.log("Clic sur Maillot Retro"); // Debugging
          gifOverlayMaillot.style.display = "flex";
          if (mainContent) {
              mainContent.classList.add("blur");
          }
      });
  }

  if (closeOverlayMaillot) {
      closeOverlayMaillot.addEventListener("click", function () {
          console.log("Fermeture de l'overlay Maillot Retro"); // Debugging
          gifOverlayMaillot.style.display = "none";
          if (mainContent) {
              mainContent.classList.remove("blur");
          }
      });
  }

  gifOverlayMaillot.addEventListener("click", function (e) {
      if (e.target === gifOverlayMaillot) {
          console.log("Fermeture en cliquant en dehors du GIF Maillot Retro"); // Debugging
          gifOverlayMaillot.style.display = "none";
          if (mainContent) {
              mainContent.classList.remove("blur");
          }
      }
  });

  // Ajustement de la taille du GIF Maillot Retro
  var gifMaillot = gifOverlayMaillot.querySelector("img");
  if (gifMaillot) {
      gifMaillot.style.maxWidth = "500px"; // Ajuste la largeur max
      gifMaillot.style.maxHeight = "300px"; // Ajuste la hauteur max
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      coverflowEffect: {
          rotate: 50, // Rotation des slides
          stretch: 0, // Écart entre les slides
          depth: 100, // Profondeur de l’effet 3D
          modifier: 1, // Intensité de l’effet
          slideShadows: true, // Ombres sur les côtés
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // --- Carousel ---
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel .item");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  let currdeg = 0;
  const angle = 360 / items.length;

  // Positionner chaque item en cercle
  items.forEach((item, index) => {
    let rotation = index * angle;
    const transformValue = `translate(-50%, -50%) rotateY(${rotation}deg) translateZ(400px)`;
    item.style.transform = transformValue;
    item.setAttribute("data-initial-transform", transformValue);
  });

  next.addEventListener("click", () => {
    currdeg -= angle;
    carousel.style.transform = `rotateY(${currdeg}deg)`;
  });

  prev.addEventListener("click", () => {
    currdeg += angle;
    carousel.style.transform = `rotateY(${currdeg}deg)`;
  });

  // --- Modal et gestion des médias (Vidéo, GIF et Galerie) ---
  const modal = document.getElementById("modal");
  const video = modal.querySelector("video");
  const videoSource = video.querySelector("source");
  const img = modal.querySelector("img"); // Pour vidéo/GIF
  const galleryContainer = modal.querySelector(".gallery");
  const galleryImg = galleryContainer.querySelector(".gallery-image");
  const galleryPrev = galleryContainer.querySelector(".gallery-prev");
  const galleryNext = galleryContainer.querySelector(".gallery-next");
  const modalInfo = modal.querySelector(".modal-info p");
  const closeBtn = modal.querySelector(".close");

  // Fonction pour masquer tous les éléments médias de la modale
  function resetModalMedia() {
    video.style.display = "none";
    img.style.display = "none";
    galleryContainer.style.display = "none";
  }

  // Ouvrir la modale lors du clic sur un item
  items.forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      resetModalMedia();

      // Affichage des informations
      const info = item.getAttribute("data-info") || "";
      modalInfo.textContent = info;

      // Gestion de la galerie de photos pour les items avec data-photos
      const photosData = item.getAttribute("data-photos");
      if (photosData) {
        const photos = photosData.split(",").map(url => url.trim());
        let currentIndex = 0;

        function updateGallery() {
          galleryImg.src = photos[currentIndex];
        }
        updateGallery();

        galleryPrev.onclick = () => {
          currentIndex = (currentIndex - 1 + photos.length) % photos.length;
          updateGallery();
        };
        galleryNext.onclick = () => {
          currentIndex = (currentIndex + 1) % photos.length;
          updateGallery();
        };

        galleryContainer.style.display = "block";
      } else {
        // Gestion classique pour vidéo ou GIF via data-video
        const mediaSrc = item.getAttribute("data-video");
        if (mediaSrc) {
          if (mediaSrc.endsWith(".gif")) {
            video.style.display = "none";
            img.style.display = "block";
            img.src = mediaSrc;
          } else if (mediaSrc.endsWith(".mp4")) {
            img.style.display = "none";
            video.style.display = "block";
            videoSource.src = mediaSrc;
            video.load();
          }
        }
      }
      modal.style.display = "block";
    });
  });

  // Fermer la modale via la croix
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    if (!video.paused) {
      video.pause();
    }
  });

  // Fermer la modale en cliquant en dehors du contenu modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      if (!video.paused) {
        video.pause();
      }
    }
  });
});
// Initialiser EmailJS avec ta Public Key
emailjs.init("X-Uk9smYeWa4UWtAM"); // Remplace par ta vraie Public Key

// Sélectionner le formulaire et écouter l'événement "submit"
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Désactiver le bouton et afficher "Envoi en cours..."
  let sendButton = document.getElementById("send-button");
  sendButton.innerText = "Envoi en cours...";
  sendButton.disabled = true;

  // Récupérer les valeurs des champs
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  // Envoyer le mail avec EmailJS
  emailjs.send("service_y06vuhn", "template_5t8vom4", {
      name: name,          // Correspond à {name} dans EmailJS
      email: email,        // Correspond à {email} dans EmailJS
      subject: subject,    // Correspond à {subject} dans EmailJS
      message: message     // Correspond à {message} dans EmailJS
  })
  .then(() => {
      alert("✅ Message envoyé avec succès !");
      document.getElementById("contact-form").reset(); // Réinitialise le formulaire
      sendButton.innerText = "Envoyer";
      sendButton.disabled = false;
  })
  .catch((error) => {
      alert("❌ Erreur lors de l'envoi : " + error.text);
      sendButton.innerText = "Envoyer";
      sendButton.disabled = false;
  });
});


// ---------contact--------

document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".animated-paragraph", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".animated-paragraph, .animated-paragraph-second", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll(".tech-button span");

  spans.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const spans1 = document.querySelectorAll(".tech-button span");
  const spans2 = document.querySelectorAll(".tech-button-second span");
  const spans3 = document.querySelectorAll(".tech-button-projects span");

  spans1.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });

  spans2.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });

  spans3.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll(".tech-button span, .tech-button-second span, .tech-button-projects span, .tech-button-services span");

  spans.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll(".tech-button span, .tech-button-second span, .tech-button-projects span, .tech-button-services span, .tech-button-tech span, .tech-button-message span");

  spans.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll(".tech-button-tech span, .tech-button-diplomas span");

  spans.forEach((span, index) => {
      span.style.transitionDelay = `${index * 20}ms`;
  });
});
