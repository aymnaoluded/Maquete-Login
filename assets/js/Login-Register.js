const signInBtnLink = document.querySelector('.signInBtn-link');

const signUpBtnLink = document.querySelector('.signUnBtn-link');

const container = document.querySelector('.container');

signUpBtnLink.addEventListener('click', () => {
    container.classList.toggle('active');
});
