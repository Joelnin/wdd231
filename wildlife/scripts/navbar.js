export function initNavbar() {
	const hamButton = document.querySelector('#menu-button');
	const navigation = document.querySelector('#animate-menu');
  
	if (hamButton && navigation) {
		hamButton.addEventListener('click', () => {
			navigation.classList.toggle('open');
			hamButton.classList.toggle('open');
		});
	//   console.log("Navbar initialized successfully.");
	} else {
	  console.error("Navbar elements not found. Check your HTML.");
	}
}