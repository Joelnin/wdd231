// General Scripts
import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';
import { toTop } from './to-top.js';

// Contact us Scripts

import { formSubmit } from './subscribe-form-handler.js';

import { hiddenDate } from './getdate.js';
import { displayData } from './contact-form-handler.js';

// News Scripts

import { getNewsArticles } from './getnewsall.js';
import { changeDisplay } from './change-display.js';

// Explore Scripts

import { getAllAnimalsSum, setSearchBar } from './getanimals.js';

// Home Scripts

import { getNewsSummary } from './getnewssum.js';
import { getEndangeredAnimals } from './getendangereds.js';
import { getVisitMessage } from './message.js';


document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFooter();
    toTop('#to-top');
    
    formSubmit();
    hiddenDate();
    displayData();
    
    getNewsArticles();
    changeDisplay();

    getAllAnimalsSum();
    setSearchBar();

    getNewsSummary();
    getEndangeredAnimals();
    getVisitMessage();


});



