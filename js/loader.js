const loader = document.getElementById("loader");
const lottieContainer = document.getElementById("lottie-loader");

if (loader && lottieContainer && typeof lottie !== "undefined") {
  // Load the Lottie file from the correct path/casing.
  lottie.loadAnimation({
    container: lottieContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "animations/Loading.json"
  });

  // Hide loader when page is loaded.
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("loader-hidden");
    }, 500);
  });
}