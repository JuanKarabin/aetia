document.addEventListener('DOMContentLoaded', () => {

	new WOW().init();

	// Header START
	$('.hamburger').on('click', function() {
		if($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$('.header-mobile-wrap').slideUp(500);
		} else {
			$(this).addClass('is-active');
			$('.header-mobile-wrap').slideDown(500);
		}
	});

	function scrollHeader() {
		let headerTopHeight = $('.header-top').height();
		if($(this).scrollTop() > headerTopHeight) {
			$('.header-bottom').addClass('is-fixed');
		} else {
			$('.header-bottom').removeClass('is-fixed');
		}
	}

	function showArrowUp() {
		if($(this).scrollTop() > 1500) {
			$('.go-up').addClass('is-active');
		} else {
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
	    $('html, body').animate({ scrollTop: $(href).offset().top }, 700);
		$('.header-mobile-wrap').slideUp(500);
		$('.hamburger').removeClass('is-active');
	    return false;
	});

	$('.go-up').on('click', function () {
	    $('html, body').animate({ scrollTop: 0 }, 700);
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

	// --- GALERÍA ---
	const gallery = document.getElementById('alborGallery');
	const showMoreBtn = document.getElementById('showMoreAlbor');
	const totalImages = 29;
	const imagesToShowInitially = 4;
	const cards = [];
	let currentIndex = -1; // índice de imagen abierta

	const imgModal = document.getElementById('imgModal');
	const modalImg = document.getElementById('imgModalSrc');
	const closeImgBtn = document.getElementById('closeImgModal');

	// Función resetGallery
	function resetGallery() {
	    cards.forEach((card, index) => {
	        card.style.display = index < imagesToShowInitially ? 'flex' : 'none';
	    });
	    if (showMoreBtn) {
	        showMoreBtn.style.display = 'inline-block';
	        showMoreBtn.style.textAlign = 'center';
	        showMoreBtn.style.padding = '10px 45px';
	        showMoreBtn.style.width = '20%';
	        showMoreBtn.style.border = 'none';
	    }
	}

	// Inicialización Magnific Popup
	$('.services-btn').magnificPopup({
	    type: 'inline',
	    showCloseBtn: false,
	    removalDelay: 500,
	    enableEscapeKey: false, // evita cerrar el modal padre con Esc
	    callbacks: {
	        beforeOpen: function() {
	            this.st.mainClass = this.st.el.attr('data-effect');
	        },
	        close: function() {
	            resetGallery();
	        }
	    }
	});

	// Crear cards de imágenes
	for (let i = 1; i <= totalImages; i++) {
	    const card = document.createElement('div');
	    card.className = 'modal-card';
	    card.style.display = i <= imagesToShowInitially ? 'flex' : 'none';

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
	        currentIndex = i - 1;
	        openModal(currentIndex);
	    });
	}

	// Agregar video como última card
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

	// Función abrir modal de imagen
	function openModal(index) {
	    const card = cards[index];
	    const img = card.querySelector('img');
	    if (img) {
	        modalImg.src = img.src;
	        imgModal.style.display = 'flex';
	    }
	}

	// Funciones navegación
	function showNext() {
	    do {
	        currentIndex = (currentIndex + 1) % cards.length;
	    } while (!cards[currentIndex].querySelector('img'));
	    openModal(currentIndex);
	}

	function showPrev() {
	    do {
	        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
	    } while (!cards[currentIndex].querySelector('img'));
	    openModal(currentIndex);
	}

	// Botones de navegación
	document.getElementById('nextImg').addEventListener('click', showNext);
	document.getElementById('prevImg').addEventListener('click', showPrev);

	// Teclado
	document.addEventListener('keydown', function(e) {
	    if (imgModal.style.display === 'flex') {
	        if (e.key === 'ArrowRight') showNext();
	        if (e.key === 'ArrowLeft') showPrev();
	        if (e.key === 'Escape') {
	            e.stopPropagation();
	            e.preventDefault();
	            imgModal.style.display = 'none';
	            modalImg.src = '';
	        }
	    }
	});

	// Cerrar con X
	closeImgBtn.addEventListener('click', function(e) {
	    e.stopPropagation();
	    imgModal.style.display = 'none';
	    modalImg.src = '';
	});

	// Cerrar con click en overlay
	imgModal.addEventListener('click', function(e) {
	    if (e.target === imgModal) {
	        imgModal.style.display = 'none';
	        modalImg.src = '';
	    }
	});

	// Mostrar Más
	showMoreBtn.addEventListener('click', function() {
	    cards.forEach(card => card.style.display = 'flex'); // mostrar todo
	    showMoreBtn.style.display = 'none';
	});

});
