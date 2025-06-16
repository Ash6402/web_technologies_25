const password = document.querySelector(".password")
const confirm_field = document.querySelector(".confirm");
const p_error = document.querySelector('.p-error')
const submit = document.querySelector(".btn")

p_error.style.display="none"
submit.setAttribute("disabled", true)

password.addEventListener('input', () => checkPassword(password, confirm_field))

confirm_field.addEventListener('input', () => checkPassword(password, confirm_field))

function checkPassword(password_f, confirm_f) {
    if(password_f.value !== confirm_f.value && confirm_f.value.length != 0) {
        confirm_field.classList.add('invalid')
        p_error.style.display="block"
        submit.setAttribute("disabled", true)

    } else if (password_f.value == confirm_f.value) {
        confirm_field.classList.remove('invalid')
        p_error.style.display="none"
        submit.removeAttribute("disabled")
    }
}

