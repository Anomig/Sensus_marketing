const loader = document.getElementById("loader")

// Lottie animatie laden
lottie.loadAnimation({
  container: document.getElementById("lottie-loader"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/loading.json"
})


// loader automatisch verbergen wanneer pagina geladen is
window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("loader-hidden")

  }, 500)

})