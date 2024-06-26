document.addEventListener("DOMContentLoaded", function() {
const formOpenBtn = document.querySelector("#form-open");
const home = document.querySelector(".home");
const formContainer = document.querySelector(".form_container");
const formCloseBtn = document.querySelector(".form_close");
const signupBtn = document.querySelector("#signup");
const loginBtn = document.querySelector("#login");
const pwShowHide = document.querySelectorAll(".pw_hide");
const loginNowBtn = document.querySelector("#login-now");
const signupNowBtn = document.querySelector(".signup_form .button");

formOpenBtn.addEventListener("click", () => {
    home.classList.add("show");
    formContainer.classList.remove("active");
});

formCloseBtn.addEventListener("click", () => {
    home.classList.remove("show");
    formContainer.classList.remove("active");
});

pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

loginNowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html"; 
});

signupNowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

});