import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  let div = document.createElement('div');
  let headlineDiv = document.createElement('div');
  let authorDiv = document.createElement('div');
  let imgDiv = document.createElement('div');
  let image1 = document.createElement('img');
  let span = document.createElement('span');

  div.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgDiv.classList.add('img-container');
  image1.src = article['authorPhoto'];
  
  headlineDiv.textContent = article['headline'];
  span.textContent = article['authorName'];

  imgDiv.appendChild(image1);

  authorDiv.appendChild(imgDiv);
  authorDiv.appendChild(span);

  div.appendChild(headlineDiv);
  div.appendChild(authorDiv);

  return div;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  let target = document.querySelector(selector);

  axios.get('http://localhost:5000/api/articles')
    .then(res => {
      console.log('here');
      console.log(res);
      let arrayNew = Object.entries(res.data.articles);
      console.log(arrayNew);
      for(let i = 0; i <arrayNew.length; i++) {
        for(let j = 0; j < arrayNew[i][1].length; j++) {
          target.appendChild(Card(arrayNew[i][1][j]));
        }
      }
    
    })
    .catch(err => {
      console.log(err);
    })
}

export { Card, cardAppender }
