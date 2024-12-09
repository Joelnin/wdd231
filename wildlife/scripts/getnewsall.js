const url = './data/news.json';

import { createArticleTemplate } from "./gettemplate.js";

const newsContainer = document.querySelector('#news-container');

export async function getNewsArticles() { // For News Page

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

    articles.forEach(article => {
        let card = createArticleTemplate(article);
        newsContainer.appendChild(card);
    });

}
