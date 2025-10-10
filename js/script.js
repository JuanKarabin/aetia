document.addEventListener('DOMContentLoaded', () => {

    new WOW().init();

    // ===================================================================
    // HEADER & NAVEGACIÓN GENERAL
    // ===================================================================

    // Menú hamburguesa
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $('.header-mobile-wrap').slideToggle(500);
    });

    // Header fijo y flecha para subir
    const $window = $(window);
    const $headerBottom = $('.header-bottom');
    const $goUp = $('.go-up');
    const headerTopHeight = $('.header-top').height();

    function updateOnScroll() {
        const scrollTop = $window.scrollTop();
        // Header fijo
        $headerBottom.toggleClass('is-fixed', scrollTop > headerTopHeight);
        // Flecha "Go Up"
        $goUp.toggleClass('is-active', scrollTop > 1500);
    }

    $window.on('scroll', updateOnScroll);
    updateOnScroll(); // Ejecutar al cargar la página

    // Smooth scroll para anclas
    $('.anchor-link').on('click', function (e) {
        e.preventDefault();
        const href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(href).offset().top }, 700);

        // Cierra el menú móvil si está abierto
        if ($('.hamburger').hasClass('is-active')) {
            $('.hamburger').removeClass('is-active');
            $('.header-mobile-wrap').slideUp(500);
        }
    });

    // Botón "Go Up"
    $goUp.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 700);
    });

    // Lógica para marcar el link activo en la navegación (vanilla JS)
    const navLinks = document.querySelectorAll('.header-nav ul li a.anchor-link');
    const sections = Array.from(navLinks).map(link => document.getElementById(link.getAttribute('href').substring(1)));

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const headerOffset = 80; // Altura del header fijo

        sections.forEach(section => {
            if (section) {
                const sectionTop = section.offsetTop - headerOffset;
                if (window.scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // ===================================================================
    // SWIPER & POPUPS (Librerías)
    // ===================================================================

    // Banner Swiper
    const bannerSwiper = new Swiper('.banner-swiper', {
        speed: 1000,
        spaceBetween: 0,
        autoHeight: true,
        navigation: {
            nextEl: '.banner-swiper .swiper-button-next',
            prevEl: '.banner-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.banner-swiper .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    // Magnific Popup
    $('.services-btn').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        closeBtnInside: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.modal-form-close').on('click', () => $.magnificPopup.close());


    // ===================================================================
    // LÓGICA DE GALERÍAS DE PROYECTOS (REFACTORIZADO)
    // ===================================================================

    /**
     * @typedef {Object} ProjectConfig
     * @property {string} id - Identificador único del proyecto (ej: '7200', 'standard').
     * @property {string} name - Nombre para el texto ALT de las imágenes.
     * @property {number} totalImages - Cantidad total de imágenes en la carpeta.
     * @property {number} initialImages - Cuántas imágenes mostrar inicialmente.
     * @property {string} imagePath - Ruta a la carpeta de imágenes del proyecto.
     */

    /**
     * @type {ProjectConfig[]}
     */
    const projectsConfig = [
        {
            id: '7200',
            name: '7200 Collins',
            totalImages: 18,
            initialImages: 4,
            imagePath: 'proyectos/multimedia/7200'
        },
        {
            id: 'Standard',
            name: 'The Standard Brickell',
            totalImages: 16,
            initialImages: 4,
            imagePath: 'proyectos/multimedia/standard'
        },
		{
            id: 'William',
            name: 'The William Residences',
            totalImages: 11,
            initialImages: 4,
            imagePath: 'proyectos/multimedia/william'
        }
        // --- PARA AGREGAR UN NUEVO PROYECTO, AÑADE UN OBJETO AQUÍ ---
        // {
        //   id: 'nuevoProyecto',
        //   name: 'Nuevo Proyecto',
        //   totalImages: 20,
        //   initialImages: 4,
        //   imagePath: 'proyectos/multimedia/nuevo'
        // }
    ];

    /**
     * Crea y gestiona una galería de proyecto completa a partir de una configuración.
     * @param {ProjectConfig} config - El objeto de configuración del proyecto.
     */
    function createProjectGallery(config) {
        // Obtener elementos del DOM basados en el ID del proyecto
        const gallery = document.getElementById(`gallery${config.id}`);
        
        // Si el contenedor de la galería no existe en el HTML, no hacer nada.
        if (!gallery) {
            return;
        }

        const showMore = document.getElementById(`showMore${config.id}`);
        const showLess = document.getElementById(`showLess${config.id}`);
        const imgModal = document.getElementById(`imgModal${config.id}`);
        const modalImgSrc = document.getElementById(`imgModalSrc${config.id}`);
        const closeImgBtn = document.getElementById(`closeImgModal${config.id}`);
        const nextImgBtn = document.getElementById(`nextImg${config.id}`);
        const prevImgBtn = document.getElementById(`prevImg${config.id}`);

        const cards = [];
        let currentIndex = -1;

        // --- Crear y añadir las cards de imágenes ---
        for (let i = 1; i <= config.totalImages; i++) {
            const card = document.createElement('div');
            card.className = 'modal-card';
            card.style.display = i <= config.initialImages ? 'flex' : 'none';

            card.innerHTML = `
                <img src="${config.imagePath}/${i}.png" alt="${config.name} ${i}" style="width:100%; height:100%; object-fit:cover;">
                <div class="modal-overlay"></div>
                <span class="modal-zoom-icon"><img src="images/magnify.svg" alt="Zoom"></span>
            `;

            gallery.appendChild(card);
            cards.push(card);

            card.querySelector('img').addEventListener('click', () => {
                currentIndex = i - 1;
                openModal(currentIndex);
            });
        }

        // --- Lógica del Modal (Lightbox) ---
        function openModal(index) {
            const card = cards[index];
            const img = card.querySelector('img');
            if (img) {
                modalImgSrc.src = img.src;
                imgModal.style.display = 'flex';
            }
        }
        
        function closeModal() {
            imgModal.style.display = 'none';
            modalImgSrc.src = '';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % cards.length;
            openModal(currentIndex);
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            openModal(currentIndex);
        }

        // Event Listeners para el modal
        nextImgBtn.addEventListener('click', showNext);
        prevImgBtn.addEventListener('click', showPrev);
        closeImgBtn.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
        imgModal.addEventListener('click', (e) => { if (e.target === imgModal) closeModal(); });

        document.addEventListener('keydown', (e) => {
            if (imgModal.style.display === 'flex') {
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'Escape') closeModal();
            }
        });

        // --- Lógica de botones "Mostrar Más" / "Mostrar Menos" ---
        if (config.totalImages <= config.initialImages) {
            if (showMore) showMore.style.display = 'none';
        }

        if (showMore) {
            showMore.addEventListener('click', () => {
                cards.forEach(card => card.style.display = 'flex');
                showMore.style.display = 'none';
                if (showLess) showLess.style.display = 'inline-block';
            });
        }

        if (showLess) {
            showLess.addEventListener('click', () => {
                cards.forEach((card, index) => {
                    if (index >= config.initialImages) {
                        card.style.display = 'none';
                    }
                });
                showLess.style.display = 'none';
                if (showMore) showMore.style.display = 'inline-block';
                gallery.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
    }

    // --- INICIALIZAR TODAS LAS GALERÍAS DEFINIDAS EN LA CONFIGURACIÓN ---
    projectsConfig.forEach(createProjectGallery);

});