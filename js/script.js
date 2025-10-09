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
