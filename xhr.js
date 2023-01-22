window.onload = function () {
  document
    .getElementById('searchForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      const query = event.target.searchQuery.value;
      const type = event.target.searchSelector.value;

      getRequest(query, type);
    });
};

function getRequest(query, type) {
  let endpoint = 'http://localhost:3000/tweets';
  if (query != undefined) {
    endpoint += '?' + 'searchQuery=' + query + '&type=' + type;
  }
  const xhr = new XMLHttpRequest();

  xhr.open('GET', endpoint);

  xhr.onload = (e) => {
    const response = JSON.parse(xhr.response);

    if (xhr.status === 200 && response.data) {
      if (type != 'user') {
        const tweets = organizeTweets(response);
        listTweets(tweets);
      } else {
        listUser(data);
      }
    } else if (!response.data) {
      listTweets([{ text: 'Não há resultados para a pesquisa.' }]);
    }
  };

  xhr.send();

  function listTweets(tweets) {
    const ul = document.getElementById('twitter-response');
    ul.innerHTML = '';

    for (let x = 0; x < tweets.length; x++) {
      const li = document.createElement('li');
      li.innerText = `${tweets[x].text}`;
      li.classList.add('twitter-wrap');
      ul.appendChild(li);
    }
  }

  function listUser(user) {
    const ul = document.getElementById('twitter-response');
    ul.innerHTML = '';
    const username = document.createElement('li');
    username.innerText = `Username: ${user[0].username} \n
    Nome: ${user[0].name} \n
    Descrição: ${user[0].description} \n
    Entrou em ${user[0].created_at}`;
    ul.appendChild(username);
  }

  function organizeTweets(tweets) {
    let organizedTweets = [];
    for (let i = 0; i < tweets.data.length; i++) {
      let tweet = tweets.data[i];
      tweets.includes.users.some((item) => {
        if (item.id == tweet.author_id) {
          tweet.username = item.username;
          tweet.profile_image_url = item.profile_image_url;
          tweet.name = item.name;
          tweet.location = item.location;
        }
      });
      if (tweet?.attachments?.media_keys) {
        tweet.media = [];
        tweet.attachments.media_keys.forEach((key) => {
          tweets.includes.media.some((item) => {
            if (item.media_key == key) {
              tweet.media.push(item);
            }
          });
        });
      }
      organizedTweets.push(tweet);
    }
    return organizedTweets;
  }
}

// getRequest();
