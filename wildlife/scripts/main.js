// General Scripts
import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';

// Contact us Scripts

import { formSubmit } from './subscribe-form-handler.js';

import { hiddenDate } from './getdate.js';
import { displayData } from './contact-form-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFooter();
    formSubmit();
    hiddenDate();
    displayData();
});



