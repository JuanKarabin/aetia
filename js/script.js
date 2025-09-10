document.addEventListener('DOMContentLoaded', () => {

	new WOW().init();

	// Header START
	$('.hamburger').on('click', function() {
		if($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$('.header-mobile-wrap').slideUp(500);
		}
		else {
			$(this).addClass('is-active');
			$('.header-mobile-wrap').slideDown(500);
		}
	});

	function scrollHeader() {
		let headerTopHeight = $('.header-top').height();
		if($(this).scrollTop() > headerTopHeight) {
			$('.header-bottom').addClass('is-fixed');
		}
		else {
			$('.header-bottom').removeClass('is-fixed');
		}
	}
	function showArrowUp() {
		if($(this).scrollTop() > 1500) {
			$('.go-up').addClass('is-active');
		}
		else {
			$('.go-up').removeClass('is-active');
		}
	}
	


	$(window).on('scroll', function() {
		scrollHeader();
		showArrowUp();
	});
	scrollHeader();
	showArrowUp();

	$('.anchor-link').on('click', function () {
	    let href = $(this).attr('href');

	    $('html, body').animate({
	        scrollTop: $(href).offset().top
	    }, {
	        duration: 700,
	    });
		$('.header-mobile-wrap').slideUp(500);
		$('.hamburger').removeClass('is-active');
	    return false;
	});

	$('.go-up').on('click', function () {
	    $('html, body').animate({
	        scrollTop: 0
	    }, {
	        duration: 700,
	    });
	    return false;
	});
	// Header END
	
	// Banner START
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
	// Banner END



	$('.modal-form-close').on('click', function() {
    $.magnificPopup.close();
});


function resetGallery() {
    // Mostrar solo las primeras imágenes
    cards.forEach((card, index) => {
        if (index < imagesToShowInitially) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Restaurar botón "Mostrar Más" con estilos correctos
    if (showMoreBtn) {
        showMoreBtn.style.display = 'inline-block'; // para que respete el centrado
        showMoreBtn.style.textAlign = 'center';
        showMoreBtn.style.padding = '10px 45px';
        showMoreBtn.style.width = '20%';
        showMoreBtn.style.border = 'none';
    }
}

	// Services START
	$('.services-btn').magnificPopup({
    type: 'inline',
    showCloseBtn: false,
    removalDelay: 500,
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        },
        close: function() {
            // Solo reinicia galería y botón, no afecta eventos
            resetGallery();
        }
    }
});

	// Services END


	


	


	const gallery = document.getElementById('alborGallery');
    const showMoreBtn = document.getElementById('showMoreAlbor');

    const totalImages = 29;
    const imagesToShowInitially = 4;

    const cards = [];

    // Crear todas las imágenes
    for (let i = 1; i <= totalImages; i++) {
        const card = document.createElement('div');
        card.className = 'modal-card';
        card.style.display = i <= imagesToShowInitially ? 'flex' : 'none'; // Mostrar solo las primeras 6

        const img = document.createElement('img');
        img.src = `proyectos/multimedia/albor/${i}.jpg`;
        img.alt = `Albor ${i}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        const zoomIcon = document.createElement('span');
        zoomIcon.className = 'modal-zoom-icon';
        zoomIcon.innerHTML = '<img src="images/magnify.svg" alt="Zoom">';

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(zoomIcon);

        gallery.appendChild(card);
        cards.push(card);

        // Click en la imagen para abrir modal
        img.addEventListener('click', function() {
            const modal = document.getElementById('imgModal');
            const modalImg = document.getElementById('imgModalSrc');
            modalImg.src = img.src;
            modal.style.display = 'flex';
        });
    }

    // Agregar video como última “card” y ocultarlo inicialmente
    const videoCard = document.createElement('div');
    videoCard.className = 'modal-card';
    videoCard.style.display = 'none';

    const video = document.createElement('video');
    video.src = 'proyectos/multimedia/albor/1.mp4';
    video.controls = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';

    videoCard.appendChild(video);
    gallery.appendChild(videoCard);
    cards.push(videoCard);

    // Botón “Mostrar Más”
    showMoreBtn.addEventListener('click', function() {
        cards.forEach(card => card.style.display = 'flex'); // Mostrar todo
        showMoreBtn.style.display = 'none'; // Ocultar botón
    });

    // Cerrar modal
    const imgModal = document.getElementById('imgModal');
    const modalImg = document.getElementById('imgModalSrc');
	const closeImgBtn = document.getElementById('closeImgModal');
    // Cerrar modal de imagen con click en la cruz
    closeImgBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita que se propague el click al modal principal
        imgModal.style.display = 'none';
        modalImg.src = '';
    });

    // Cerrar modal de imagen si se hace click fuera de la imagen
    imgModal.addEventListener('click', function(e) {
        if(e.target === imgModal) {
            imgModal.style.display = 'none';
            modalImg.src = '';
        }
    });

    // Cerrar modal de imagen con Escape
	document.addEventListener('keydown', function(e) {
		const imgModal = document.getElementById('imgModal');
		const modalImg = document.getElementById('imgModalSrc');

		if (e.key === 'Escape' && imgModal.style.display === 'flex') {
			e.stopPropagation(); // Evita que Magnific Popup cierre el modal principal
			e.preventDefault();   // Previene comportamiento por defecto
			imgModal.style.display = 'none';
			modalImg.src = '';
		}
	});

})