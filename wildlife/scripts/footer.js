export function initFooter() {
    const currentYear = document.querySelector("#currentyear");
    const lastModified = document.querySelector("#lastModified");
  
    if (currentYear && lastModified) {
        const today = new Date();
    
        currentYear.innerHTML = `<span>${today.getFullYear()}</span>`;
        lastModified.innerHTML = `Last Modification: <span>${document.lastModified}</span>`;
        // console.log("Footer initialized successfully.");
    } else {
        console.error("Footer elements not found. Check your HTML.");
    }
}