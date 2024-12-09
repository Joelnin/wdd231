// General Scripts
import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';
import { toTop } from './to-top.js';

// Contact us Scripts

import { formSubmit } from './subscribe-form-handler.js';

import { hiddenDate } from './getdate.js';
import { displayData } from './contact-form-handler.js';

// News Scripts

import { getNewsArticles , getNewsSummary } from './getnews.js';
import { changeDisplay } from './change-display.js';

// Explore Scripts

import { getAllAnimalsSum } from './getanimals.js';
import { setSearchBar } from './getanimals.js';


document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFooter();
    toTop('#to-top');
    
    formSubmit();
    hiddenDate();
    displayData();
    
    getNewsArticles();
    getNewsSummary();
    changeDisplay();

    getAllAnimalsSum();
    setSearchBar();
    


});



