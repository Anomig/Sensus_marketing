const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".menu-close");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.add("active");
  });
}

if (closeBtn && navMenu) {
  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
}

const articleConfig = {
  "maatschappelijk-belang": {
    title: "Maatschappelijk belang",
    imageSrc: "assets/images/placeholders/placeholder1.png",
    imageAlt: "Banner van case maatschappelijk belang",
  },
  "testfase-bachelorproef": {
    title: "Testfase Bachelorproef",
    imageSrc: "assets/images/placeholders/placeholder2.png",
    imageAlt: "Banner van case testfase bachelorproef",
  },
};

const defaultCaseHeader = {
  title: "Case Study",
  imageSrc: "assets/images/mockups/mockup-desktop-reflectie.png",
  imageAlt: "Algemene case study banner",
};

function getSelectedArticleKey() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleParam = urlParams.get("article");

  if (articleParam && articleConfig[articleParam]) {
    return articleParam;
  }

  if (window.location.hash) {
    const hashId = decodeURIComponent(window.location.hash.slice(1));

    if (hashId === "article-testfase-bachelorproef") {
      return "testfase-bachelorproef";
    }

    if (hashId === "article-maatschappelijk-belang") {
      return "maatschappelijk-belang";
    }
  }

  return null;
}

function applyHeaderForArticle(articleKey) {
  const config = articleKey ? articleConfig[articleKey] : defaultCaseHeader;

  if (!config) {
    return;
  }

  const headerTitle = document.querySelector(".case-header-overlay h1");
  const headerImage = document.querySelector(".case-hearder img");

  if (headerTitle) {
    headerTitle.textContent = config.title;
  }

  if (headerImage) {
    headerImage.src = config.imageSrc;
    headerImage.alt = config.imageAlt;
  }
}

function applyCaseDetailContent(articleKey) {
  const detailBlocks = document.querySelectorAll(".case-detail-content");
  const emptyState = document.querySelector(".case-detail-empty");

  if (detailBlocks.length === 0) {
    return;
  }

  let hasActiveBlock = false;

  detailBlocks.forEach((block) => {
    const isActive = articleKey && block.dataset.article === articleKey;
    block.hidden = !isActive;

    if (isActive) {
      hasActiveBlock = true;
    }
  });

  if (emptyState) {
    emptyState.hidden = hasActiveBlock;
  }

  const articleContainer = document.querySelector(".case-article");

  if (articleContainer && hasActiveBlock) {
    articleContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectedArticle = getSelectedArticleKey();
  applyHeaderForArticle(selectedArticle);
  // First pass right after the DOM is parsed.
  requestAnimationFrame(() => applyCaseDetailContent(selectedArticle));
});

window.addEventListener("load", () => {
  const selectedArticle = getSelectedArticleKey();
  // Second pass after all assets are loaded.
  applyCaseDetailContent(selectedArticle);
  setTimeout(() => applyCaseDetailContent(selectedArticle), 150);
});

window.addEventListener("hashchange", () => {
  const selectedArticle = getSelectedArticleKey();
  applyHeaderForArticle(selectedArticle);
  applyCaseDetailContent(selectedArticle);
});

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
