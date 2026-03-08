const carousel = document.querySelector('.feature-carousel');

if (carousel) {
	const slides = Array.from(carousel.querySelectorAll('.feature-carousel-slide'));
	const dots = Array.from(carousel.querySelectorAll('.feature-carousel-dot'));
	const prevButton = carousel.querySelector('.feature-carousel-prev');
	const nextButton = carousel.querySelector('.feature-carousel-next');

	let activeIndex = 0;

	const showSlide = (index) => {
		activeIndex = (index + slides.length) % slides.length;

		slides.forEach((slide, i) => {
			const isActive = i === activeIndex;
			slide.hidden = !isActive;
			slide.classList.toggle('is-active', isActive);
		});

		dots.forEach((dot, i) => {
			dot.classList.toggle('is-active', i === activeIndex);
			dot.setAttribute('aria-current', i === activeIndex ? 'true' : 'false');
		});
	};

	prevButton?.addEventListener('click', () => showSlide(activeIndex - 1));
	nextButton?.addEventListener('click', () => showSlide(activeIndex + 1));

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => showSlide(index));
	});

	showSlide(0);
}
