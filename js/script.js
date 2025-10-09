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

	const links = document.querySelectorAll('.header-nav ul li a.anchor-link');
	function setActive(link) {
		links.forEach(l => l.classList.remove('active'));
		link.classList.add('active');
	}
	links.forEach(link => {
		link.addEventListener('click', function (e) {
			// Si es un anchor interno, evitar navegación y marcar activo
			if (link.getAttribute('href').startsWith('#')) {
				setActive(link);
			}
		});
	});
	// Opcional: marcar activo según scroll
	window.addEventListener('scroll', function () {
		const sections = ['about', 'services', 'projects', 'contact'];
		let found = false;
		for (let sec of sections) {
			const el = document.getElementById(sec);
			if (el) {
				const rect = el.getBoundingClientRect();
				if (rect.top <= 80 && rect.bottom > 80) {
					const navLink = document.getElementById('nav-' + sec);
					if (navLink) setActive(navLink);
					found = true;
					break;
				}
			}
		}
		if (!found) setActive(document.getElementById('nav-inicio'));
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

	/*START ALBOR*/

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


	/*END ALBOR*/

	/*START AURA*/

		// --- GALERÍA AURA ---
	const auraGallery = document.getElementById('auraGallery');
	const showMoreAura = document.getElementById('showMoreAura');
	const totalAuraImages = 13;
	const auraImagesToShowInitially = 4;
	const auraCards = [];
	let currentAuraIndex = -1;

	const imgModalAura = document.getElementById('imgModalAura');
	const modalImgAura = document.getElementById('imgModalSrcAura');
	const closeImgBtnAura = document.getElementById('closeImgModalAura');

	// Crear cards Aura
	for (let i = 1; i <= totalAuraImages; i++) {
	    const card = document.createElement('div');
	    card.className = 'modal-card';
	    card.style.display = i <= auraImagesToShowInitially ? 'flex' : 'none';

	    const img = document.createElement('img');
	    img.src = `proyectos/multimedia/aura/${i}.jpg`;
	    img.alt = `Aura ${i}`;
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

	    auraGallery.appendChild(card);
	    auraCards.push(card);

	    img.addEventListener('click', function() {
	        currentAuraIndex = i - 1;
	        openAuraModal(currentAuraIndex);
	    });
	}

	// Abrir modal
	function openAuraModal(index) {
	    const card = auraCards[index];
	    const img = card.querySelector('img');
	    if (img) {
	        modalImgAura.src = img.src;
	        imgModalAura.style.display = 'flex';
	    }
	}

	// Navegación Aura
	function showNextAura() {
	    do {
	        currentAuraIndex = (currentAuraIndex + 1) % auraCards.length;
	    } while (!auraCards[currentAuraIndex].querySelector('img'));
	    openAuraModal(currentAuraIndex);
	}

	function showPrevAura() {
	    do {
	        currentAuraIndex = (currentAuraIndex - 1 + auraCards.length) % auraCards.length;
	    } while (!auraCards[currentAuraIndex].querySelector('img'));
	    openAuraModal(currentAuraIndex);
	}

	document.getElementById('nextImgAura').addEventListener('click', showNextAura);
	document.getElementById('prevImgAura').addEventListener('click', showPrevAura);

	// Teclado Aura
	document.addEventListener('keydown', function(e) {
	    if (imgModalAura.style.display === 'flex') {
	        if (e.key === 'ArrowRight') showNextAura();
	        if (e.key === 'ArrowLeft') showPrevAura();
	        if (e.key === 'Escape') {
	            e.stopPropagation();
	            e.preventDefault();
	            imgModalAura.style.display = 'none';
	            modalImgAura.src = '';
	        }
	    }
	});

	// Cerrar con X
	closeImgBtnAura.addEventListener('click', function(e) {
	    e.stopPropagation();
	    imgModalAura.style.display = 'none';
	    modalImgAura.src = '';
	});

	// Cerrar con click en overlay
	imgModalAura.addEventListener('click', function(e) {
	    if (e.target === imgModalAura) {
	        imgModalAura.style.display = 'none';
	        modalImgAura.src = '';
	    }
	});

	// Mostrar Más
	showMoreAura.addEventListener('click', function() {
	    auraCards.forEach(card => card.style.display = 'flex');
	    showMoreAura.style.display = 'none';
	});



	/*END AURA*/


	/*START 7200 COLLINS*/

	// --- GALERÍA 7200 COLLINS ---
	const gallery7200 = document.getElementById('gallery7200');
	const showMore7200 = document.getElementById('showMore7200');
	const showLess7200 = document.getElementById('showLess7200');
	const total7200Images = 18; // <-- ¡IMPORTANTE! Cambia este número por la cantidad de imágenes que tengas.
	const images7200ToShowInitially = 4; // Puedes mostrar menos al inicio si quieres
	const cards7200 = [];
	let current7200Index = -1;

	const imgModal7200 = document.getElementById('imgModal7200');
	const modalImgSrc7200 = document.getElementById('imgModalSrc7200');
	const closeImgBtn7200 = document.getElementById('closeImgModal7200');

	// Crear cards 7200 Collins
	for (let i = 1; i <= total7200Images; i++) {
		const card = document.createElement('div');
		card.className = 'modal-card';
		card.style.display = i <= images7200ToShowInitially ? 'flex' : 'none';

		const img = document.createElement('img');
		// Asegúrate que la ruta de la carpeta sea correcta
		img.src = `proyectos/multimedia/7200/${i}.png`; 
		img.alt = `7200 Collins ${i}`;
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

		gallery7200.appendChild(card);
		cards7200.push(card);

		img.addEventListener('click', function() {
			current7200Index = i - 1;
			open7200Modal(current7200Index);
		});
	}

	// Ocultar botón "Mostrar Más" si no es necesario
	if (total7200Images <= images7200ToShowInitially) {
		showMore7200.style.display = 'none';
	}

	// Abrir modal
	function open7200Modal(index) {
		const card = cards7200[index];
		const img = card.querySelector('img');
		if (img) {
			modalImgSrc7200.src = img.src;
			imgModal7200.style.display = 'flex';
		}
	}

	// Navegación
	function showNext7200() {
		current7200Index = (current7200Index + 1) % cards7200.length;
		open7200Modal(current7200Index);
	}

	function showPrev7200() {
		current7200Index = (current7200Index - 1 + cards7200.length) % cards7200.length;
		open7200Modal(current7200Index);
	}

	document.getElementById('nextImg7200').addEventListener('click', showNext7200);
	document.getElementById('prevImg7200').addEventListener('click', showPrev7200);

	// Teclado
	document.addEventListener('keydown', function(e) {
		if (imgModal7200.style.display === 'flex') {
			if (e.key === 'ArrowRight') showNext7200();
			if (e.key === 'ArrowLeft') showPrev7200();
			if (e.key === 'Escape') {
				e.stopPropagation();
				e.preventDefault();
				imgModal7200.style.display = 'none';
				modalImgSrc7200.src = '';
			}
		}
	});

	// Cerrar con X
	closeImgBtn7200.addEventListener('click', function(e) {
		e.stopPropagation();
		imgModal7200.style.display = 'none';
		modalImgSrc7200.src = '';
	});

	// Cerrar con click en overlay
	imgModal7200.addEventListener('click', function(e) {
		if (e.target === imgModal7200) {
			imgModal7200.style.display = 'none';
			modalImgSrc7200.src = '';
		}
	});

	// LÓGICA DE LOS BOTONES "MOSTRAR MÁS" Y "MOSTRAR MENOS"

	// --- Evento para "Mostrar Más" ---
	if (showMore7200) {
		showMore7200.addEventListener('click', function() {
			// Muestra todas las imágenes
			cards7200.forEach(card => card.style.display = 'flex');
			
			// Oculta "Mostrar Más" y muestra "Mostrar Menos"
			showMore7200.style.display = 'none';
			if(showLess7200) showLess7200.style.display = 'inline-block';
		});
	}

	// --- Evento para "Mostrar Menos" ---
	if (showLess7200) {
		showLess7200.addEventListener('click', function() {
			// Oculta las imágenes que exceden el límite inicial
			cards7200.forEach((card, index) => {
				if (index >= images7200ToShowInitially) {
					card.style.display = 'none';
				}
			});
			
			// Oculta "Mostrar Menos" y muestra "Mostrar Más"
			showLess7200.style.display = 'none';
			if(showMore7200) showMore7200.style.display = 'inline-block';

			// Opcional: Hace scroll suave hacia el inicio de la galería para mejor UX
			gallery7200.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}

	/*END 7200 COLLINS*/

});
