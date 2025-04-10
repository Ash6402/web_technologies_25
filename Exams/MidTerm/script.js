const links = document.querySelectorAll(".link")
const frame = document.querySelector("#frame")

links.forEach(link => 
link.addEventListener("click", () => {
    const src = link.dataset.src;
    frame.src = src;
}))
