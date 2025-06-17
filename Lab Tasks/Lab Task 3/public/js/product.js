const sizes = document.querySelectorAll(".size");

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
