const url = './data/news.json';

import { createArticleSumTemplate } from "./gettemplate.js";

const newsContainer = document.querySelector('#news-summary');

export async function getNewsSummary() { // For Home Page

    if (newsContainer) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.articles); // temporary testing of data response
            displayNews(data.articles);

        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
        }
    }
}

const displayNews = (articles) => {
    newsContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const article = articles[i];
        let card = createArticleSumTemplate(article);
        newsContainer.appendChild(card);
        
    }
}

