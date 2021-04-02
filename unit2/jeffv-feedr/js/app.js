/*
  Please add all Javascript code to this file.
*/

/* fetching top reddit posts about COVID */
let redditUrl = 'https://www.reddit.com/r/CollegeBasketball/.json'
let newsApiKey = '0adde3f4b8e448a2920e25c0808842b6'
let newsApi = `https://newsapi.org/v2/top-headlines?apiKey=0adde3f4b8e448a2920e25c0808842b6&country=us&category=sports&q=basketball`

// let sources = [
//   'https://www.reddit.com/r/CollegeBasketball/.json',
//   `https://newsapi.org/v2/top-headlines?apiKey=${newsApiKey}&country=us&category=sports&q=basketball`
// ]

const onLoadHandler = () => {
  let loadingdiv = document.getElementById('popUp');
  loadingdiv.classList.toggle('hidden');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
  onLoadHandler();
}


const fetchReddit = async () => {
  try {
    const rawResponse = await fetch(redditUrl);

    if (!rawResponse.ok) {
      throw new Error(rawResponse.message);
    }

    if (rawResponse.status === 404) {
      throw new Error('Not found');
    }

    const jsonResponse = await rawResponse.json();
    let articles = jsonResponse.data.children;
    // console.log(articles);

    for (let i = 0; i < 5; i++) {
      let thumbnail = articles[i].data.thumbnail;
      if (thumbnail === 'self') {
        thumbnail = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/NCAA_logo.svg/440px-NCAA_logo.svg.png'
      } // set thumbnail to the NCAA logo if reddit does not provide and icon
      let title = articles[i].data.title;
      let tag = articles[i].data.subreddit_name_prefixed;
      let impressions = articles[i].data.ups;
      let url = articles[i].data.url;
      let summary = articles[i].data.selftext;
      renderRows(thumbnail, title, tag, impressions, url, summary)    
    }
    let loadingdiv = document.getElementById('popUp');
    loadingdiv.classList.toggle('hidden');

  } catch (err) {
    console.error(err);
    alert('Reddit API could not be loaded')
  }
};

const fetchNewsApi = async () => {
  try {
    const rawResponse = await fetch(newsApi, {mode: 'cors'});

    if (!rawResponse.ok) {
      throw new Error(rawResponse.message);
    }

    if (rawResponse.status === 404) {
      throw new Error('Not found');
    }
    const jsonResponse = await rawResponse.json();
    let articles = jsonResponse.articles;


    for (let i = 0; i < articles.length; i++) {
      let thumbnail = articles[i].urlToImage;
      let title = articles[i].title;
      let tag = 'College Basketball' // no tag provided in data
      let impressions = Math.floor(Math.random() * 200); //no impression provided in data
      let url = articles[i].url;
      let summary = articles[i].content;
      renderRows(thumbnail, title, tag, impressions, url, summary)    
    }

  } catch (err) {
    console.error(err);
    alert('News API could not be loaded')
  }
};

const previewArticle = (title, summary) => {
  console.log(title, summary);
  let popUp = document.getElementById('popUp');
  popUp.classList.toggle('hidden');
  if (popUp.classList.contains('loader')) {
    popUp.classList.toggle('loader')
  }
  popUp.children[1].style.display = 'block';
  let previewH1 = document.querySelector('.previewH1');
  let previewPara = document.querySelector('.previewPara');
  previewH1.innerHTML = title;
  previewPara.innerHTML = summary;
}


const renderRows = (thumbnail, title, tag, impressions, url, summary) => {

  let article = document.createElement('article');
  // console.log('before', title);
  title = title.replace(/'/,'');
  // console.log('after', title);
  article.innerHTML = `
      <section class="featuredImage">
        <img src="${thumbnail}" alt="" />
      </section>
      <section class="articleContent">
          <a href="${url}" target="_blank"><h3>${title}</h3></a>
          <h6>${tag}</h6>
          <button class="preview" onclick="previewArticle()">Preview</button>
      </section>
      <section class="impressions">
        ${impressions}
      </section>
      <div class="clearfix"></div>
  `;
  article.classList.add('article')
  document.getElementById('main').appendChild(article);
}

// Close popup button
document.querySelector('.closePopUp').addEventListener('click', () => {
  let popUp = document.getElementById('popUp');
  popUp.children[1].style.display = 'none';
  popUp.classList.toggle('hidden');
})

//search button
document.querySelector('.searchBtn').addEventListener('click', () => {
  let searchContainer = document.getElementById('search');
  searchContainer.classList.toggle('active');
})

let redditSource = document.querySelector('.redditBtn');
redditSource.addEventListener('click', () => {
  document.querySelector('.sourceName').textContent = 'Reddit';
  let loadingdiv = document.getElementById('popUp');
  loadingdiv.classList.toggle('hidden');
  if (!popUp.classList.contains('loader')) {
    popUp.classList.toggle('loader')
  }
  while (document.getElementById('main').firstChild) {
    document.getElementById('main').removeChild(document.getElementById('main').firstChild);
  }
  fetchReddit();
})

let newApiSource = document.querySelector('.newsApiBtn');
newApiSource.addEventListener('click', () => {
  document.querySelector('.sourceName').textContent = 'NewsApi';
  while (document.getElementById('main').firstChild) {
    document.getElementById('main').removeChild(document.getElementById('main').firstChild);
  }
  fetchNewsApi();
})

let homeBtn = document.querySelector('.home');
homeBtn.addEventListener('click', () => {
  window.location.reload();
})



fetchReddit();
fetchNewsApi();

