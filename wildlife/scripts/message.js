const visitFeedback = document.querySelector('#time-between');

export function getVisitMessage() {

    if (visitFeedback) {

        let firstTime = localStorage.getItem("firstvisit");
        let visitTime = localStorage.getItem("lastvisit");
    // console.log(visitTime);

        if (visitTime == null) {

            visitFeedback.textContent = "Welcome! Let's learn about animals together";
            localStorage.setItem("firstvisit", Date.now());

        } else {

            // Milisecond in a day = 86400000
            let timeDifference = (Date.now() - visitTime) / 86400000;
            // console.log(timeDifference) // Check time

            if (timeDifference < 1) {

                visitFeedback.textContent = "Back so soon? That's awesome!";

            } else {

                visitFeedback.textContent = `Your last visit was ${Math.floor(timeDifference)} days ago. Welcome back`;

            }
        }

        localStorage.setItem("lastvisit", Date.now());
    }
}


