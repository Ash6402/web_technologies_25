const accountBtn = document.querySelector(".account-btn");
const accountDropdown = document.querySelector(".account-dropdown")

accountBtn.addEventListener('click', () => {
    accountDropdown.classList.toggle('hide')   
})

console.log(accountDropdown, accountBtn)
