const sizes = document.querySelectorAll(".size");
const closeBtn = document.querySelector(".toast-close")

sizes.forEach((s) => {
  s.addEventListener("click", (e) => {
    sizes.forEach((s) => {
      if (s == e.target) {
        s.classList.add("selected");
      } else {
        s.classList.remove("selected");
      }
    });
  });
});

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.querySelector(".success-toast").classList.add("hide")
    })
}

