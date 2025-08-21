document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll on anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // On load with hash (from another page)
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });

        // 🔁 Try to play the video if navigating to education section
        if (hash === "#educationSection") {
          const video = document.getElementById("educationVideo");
          if (video && video.paused) {
            video.play().catch(() => {
              // If autoplay fails (some browsers), ignore silently
            });
          }
        }

      }, 200); // delay to ensure DOM and media loaded
    }
  }
});
