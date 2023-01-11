// import needle from 'needle';
const getBtn = document.getElementById('get-request');

const token =
  'AAAAAAAAAAAAAAAAAAAAANMVlAEAAAAA6HALSRbjXErQ0vSRHpGSd2vv5t0%3DXYaVYTXEs2f4r6CtCE1o7mHBmCbA62vuDke4ZPdwRpJ6K95YWT';
const endpoint = 'https://api.twitter.com/2/tweets/search/recent?query=jade';
function getRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', endpoint);
  // xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  // xhr.setRequestHeader(
  //   'Access-Control-Allow-Methods',
  //   'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  // );
  // xhr.setRequestHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  // );
  // xhr.setRequestHeader('authorization', `Bearer ${token}`);
  // xhr.setRequestHeader('User-Agent', 'v2RecentSearchJS');

  xhr.onload = (e) => {
    console.log(xhr.status);

    if (xhr.status === 200) console.log(xhr.response);
    listTweets(JSON.parse(xhr.response));
  };
  xhr.send();

  function listTweets(tweets) {
    const ul = document.getElementById('last-tweets');
    ul.innerHTML = '';
    const lu = document.createElement('li');
    lu.innerText = 'blabla';
    ul.appendChild(lu);
    for (let x = 0; x < 10; x++) {
      const li = document.createElement('li');
      li.innerText = `${tweets.data[x].text}`;
      ul.appendChild(li);
    }
  }
}

getRequest();
getBtn.addEventListener('click', getRequest());
