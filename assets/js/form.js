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

loginNowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernamelogin = document.getElementById("usernamelogin").value.trim();
    const passwordlogin = document.getElementById("passwordlogin").value.trim();

    if (usernamelogin && passwordlogin) {
        e.preventDefault();
        alert("Please fill in all fields in the login form");
    } else {
        window.location.href = "index.html";
    }
});

signupNowBtn.addEventListener("click", (e) => {
    const usernamesignup = document.getElementById("usernamesignup").value.trim();
    const passwordsignup = document.getElementById("passwordsignup").value.trim();
    const confirmpasswordsignup = document.getElementById("confirmpasswordsignup").value.trim();

    if (usernamesignup && passwordsignup && confirmpasswordsignup) {
        e.preventDefault();
        alert("Please fill in all fields in the signup form");
    } else if (passwordsignup !== confirmpasswordsignup) {
        e.preventDefault();
        alert("passwords do not match, please confirm your password");

    } else {
        formContainer.classList.remove("active");
    }

}); // chekear cambias 

});