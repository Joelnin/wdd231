// General Scripts
import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';

// Contact us Scripts

import { formSubmit } from './subscribe-form-handler.js';

import { hiddenDate } from './getdate.js';
import { displayData } from './contact-form-handler.js';

// News Scripts

import { getNewsArticles , getNewsSummary } from './getnews.js';
import { changeDisplay } from './change-display.js';

// Explore Scripts

import { getAllAnimalsSum } from './getanimals.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFooter();
    formSubmit();
    hiddenDate();
    displayData();
    getNewsArticles();
    getNewsSummary();
    changeDisplay();
    getAllAnimalsSum();

});



