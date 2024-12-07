export function formSubmit() {
    const form = document.getElementById('newspaper-form');
    const subscribeSection = document.getElementById('subscribe-section');
    const thankYouMessage = document.getElementById('newspaper-thanks');

    if (form && subscribeSection && thankYouMessage){
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
    
            subscribeSection.classList.add('not-reveal');
            thankYouMessage.classList.remove('not-reveal');
        });
        // console.log("Newspaper subscription form initialized successfully.")
    }
}
