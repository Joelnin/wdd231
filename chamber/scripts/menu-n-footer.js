// Menu

const hamButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#animate-menu');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Footer

const currentyear = document.querySelector("#currentyear");
const olastModified = document.querySelector("#lastModified");

const today = new Date();

currentyear.innerHTML = `<span>${today.getFullYear()}</span>`;

olastModified.innerHTML = `Last Modification: <span>${document.lastModified}</span>`;
