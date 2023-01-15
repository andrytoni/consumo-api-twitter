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
    if (xhr.status === 200 && query != undefined) {
      if (type != 'user') {
        listTweets(JSON.parse(xhr.response));
      } else {
        listUser(JSON.parse(xhr.response));
      }
    }
  };

  xhr.send();

  function listTweets(tweets) {
    const ul = document.getElementById('twitter-response');
    ul.innerHTML = '';

    for (let x = 0; x < tweets.length; x++) {
      const li = document.createElement('li');
      li.innerText = `${tweets[x].text}`;
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
}

// getRequest();
