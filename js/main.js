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
    imageSrc: "assets/images/mockups/mockup-dekstop-safe.png",
  },
  "testfase-bachelorproef": {
    title: "Testfase Bachelorproef",
    imageSrc: "assets/images/mockups/mockup-dekstop-scenarios.png",
  },
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

  return "maatschappelijk-belang";
}

function applyHeaderForArticle(articleKey) {
  const config = articleConfig[articleKey];

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
  }
}

function applyCaseDetailContent(articleKey) {
  const detailBlocks = document.querySelectorAll(".case-detail-content");

  if (detailBlocks.length === 0) {
    return;
  }

  detailBlocks.forEach((block) => {
    const isActive = block.dataset.article === articleKey;
    block.hidden = !isActive;
  });

  const articleContainer = document.querySelector(".case-article");

  if (articleContainer) {
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