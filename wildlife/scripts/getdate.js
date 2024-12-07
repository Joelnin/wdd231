export function hiddenDate() {
    let today = document.querySelector('#today');
    
    if (today) {
        today.value = new Date();
        // console.log("Hidden date stamp initialized successfully.");
    }
}