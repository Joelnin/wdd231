const url = './data/news.json';

const newsContainer = document.querySelector('#news-container');
const newsResume = document.querySelector('#news-summary');


export async function getNewsArticles() { // For News Page

    if (newsContainer) {

        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.articles); // temporary testing of data response
            display15News(data.articles);

        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
        }
    }
}

export async function getNewsSummary() { // For Home Page

    if (newsResume) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.articles); // temporary testing of data response
            display3News(data.articles);

        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
        }
    }
}

getNewsArticles();

function createArticleTemplate(article) {

    /*
    Card          | article
    Image         | img (not posible for 500kb limit, read about this)
    Title         | h3
    Descripción   | p
    Source        | p
    SourceURL     | a
    */
    
    let card = document.createElement('article');

    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'art-img')

    if (article.urlToImage) {
        let img = document.createElement('img');

        img.setAttribute('src',`images/${article.urlToImage}`);
        img.setAttribute('alt',`${article.title} Image`);
        img.setAttribute('height', '300');
        img.setAttribute('width', '300');
        img.setAttribute('loading', 'lazy');

        divImg.appendChild(img);
    }

    let divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'art-info')

    let title = document.createElement('h3');
    title.textContent = article.title;
    divInfo.appendChild(title);
    // card.appendChild(title);

    let description = document.createElement('p');

    if (article.description) {
    
        description.textContent = article.description;
    
    } else {
        description.textContent = "There's no description available.";
    }

    divInfo.appendChild(description);
    // card.appendChild(description);

    let source = document.createElement('p');

    source.textContent = `Source: ${article.source.name}`;
    divInfo.appendChild(source);
    // card.appendChild(source);

    let sourceURL = document.createElement('a');

    sourceURL.setAttribute('href', `${article.url}`);
    sourceURL.setAttribute('target', '_blank');
    sourceURL.textContent = "Read Article";
    divInfo.appendChild(sourceURL);
    // card.appendChild(sourceURL);


    card.appendChild(divImg);
    card.appendChild(divInfo);

    return card;
}

const display15News = (articles) => {
    newsContainer.innerHTML = "";

    for (let i = 0; i < 15; i++) {
        const article = articles[i];
        let card = createArticleTemplate(article);
        newsContainer.appendChild(card);
        
    }
}

const display3News = (articles) => {
    newsContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const article = articles[i];
        let card = createArticleTemplate(article);
        newsContainer.appendChild(card);
        
    }
}

