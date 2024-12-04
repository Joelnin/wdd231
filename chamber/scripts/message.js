const visitFeedback = document.querySelector('#time-between');

let visitTime = localStorage.getItem("firstvisit");
// console.log(visitTime);

if (visitTime == null) {

    visitFeedback.textContent = "Welcome! Let us know if you have any questions.";
    localStorage.setItem("firstvisit", Date.now());

} else {

    // Milisecond in a day = 86400000

    let timeDifference = (Date.now() - visitTime) / 86400000;
    // console.log(timeDifference) // Check time

    if (timeDifference < 1) {

        visitFeedback.textContent = "Back so soon! Awesome!";

    } else {

        visitFeedback.textContent = `You last visited ${Math.floor(timeDifference)} days ago`;

    }
  
}