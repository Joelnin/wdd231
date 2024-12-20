// Menu

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const profile = document.querySelector('.profile');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
    profile.classList.toggle('open');
});

// Footer

const currentyear = document.querySelector("#currentyear");
const olastModified = document.querySelector("#lastModified");

const today = new Date();

currentyear.innerHTML = `<span>${today.getFullYear()}</span>`;

olastModified.innerHTML = `Last Update: <span>${document.lastModified}</span>`;

// Content

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function createNameTags(courses) {
    let subjects = document.querySelector('#subjects');
    subjects.innerHTML = "";
    courses.forEach(course => {
        let nameTag = document.createElement('li');

        nameTag.innerHTML = `${course.subject} ${course.number}`;
        nameTag.setAttribute('class', 'course-tag');
        nameTag.setAttribute('id', course.title)

        if (course.completed) {
            nameTag.classList.add('class', 'completed');
        }

        nameTag.addEventListener ("click", () => {
            displayCourseDetails(course);
        });

        subjects.appendChild(nameTag);
    });
}

createNameTags(courses);

const allFilter = document.querySelector("#filter-all");
const cseFilter = document.querySelector('#filter-cse');
const wddFilter = document.querySelector("#filter-wdd");

let creditsArray = [];

function getCreditsRequired(coursesArray) {

    creditsArray = [];

    coursesArray.forEach(function(course) {
        creditsArray.push(course.credits);
    });

    document.querySelector('#credits').innerHTML = creditsArray.reduce(sumCredits);
}

function sumCredits(total, num) {
    return total + num;
}

getCreditsRequired(courses);

// Filters

let coursesDisplay;

allFilter.addEventListener('click', () => {
    createNameTags(courses);
    getCreditsRequired(courses);
});

cseFilter.addEventListener('click', () => {
    coursesDisplay = courses.filter(course => (course.subject == 'CSE'));
    createNameTags(coursesDisplay);
    getCreditsRequired(coursesDisplay);
});

wddFilter.addEventListener('click', () => {
    let coursesDisplay = courses.filter(course => (course.subject == 'WDD'));
    createNameTags(coursesDisplay);
    getCreditsRequired(coursesDisplay);
});

const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = "";

    let button = document.createElement('button')

    button.setAttribute('id', 'closeModal');
    button.textContent = "❌";

    let subtitle = document.createElement('h3');

    subtitle.textContent = `${course.subject} ${course.number.toString()}`;

    let title = document.createElement('h2');

    title.textContent = course.title;

    let credits = document.createElement('p');

    credits.innerHTML = `<strong>Credits</strong>: ${course.credits}`;

    let certificate = document.createElement('p');

    certificate.innerHTML = `<strong>Certificate</strong>: ${course.certificate}`

    let description = document.createElement('p');

    description.textContent = course.description;

    let technologies = document.createElement('p');

    technologies.innerHTML = `<strong>Technologies</strong>: ${course.technology.join(', ')}`;

    courseDetails.appendChild(button);
    courseDetails.appendChild(title);
    courseDetails.appendChild(subtitle);
    courseDetails.appendChild(credits);
    courseDetails.appendChild(certificate);
    courseDetails.appendChild(description);
    courseDetails.appendChild(technologies);

    courseDetails.showModal();

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}