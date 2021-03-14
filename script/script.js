const request = new XMLHttpRequest();
request.open('GET', './dbHeroes.json');
request.send();
request.addEventListener('readystatechange', (event) => {
  if (request.readyState === 4) {
    showHeroes(JSON.parse(request.response))
  }
})

const heroesBlock = document.querySelector('.heroes-cards')

function showHeroes(heroes) {
  console.log(heroes);
  heroes.forEach(hero => {
    const heroCard = `
    <div class="hero-card">
    <img src="${hero.photo}" alt="hero-avatar" class="hero-avatar">
    <span class="hero-name">${hero.name}</span>
    <span class="hero-live-name">${hero.actors}</span>
    <span class="hero-status">${hero.status}</span>
    <span class="hero-films">${hero.movies ? hero.movies.join(', ') : ''}</span>
    </div>`;
    heroesBlock.insertAdjacentHTML('beforeend', heroCard);
  })
}

const searchInput = document.querySelector('.search');

const debounce = (func, ms) => {
  let timeout;
  return function () {
    const fnCall = () => func.apply(this, arguments)
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  }
}

function searchFilms(target) {
  fetch('./dbHeroes.json')
    .then(response => response.json())
    .then(response => showFoundFilms(response, target))
}

searchFilms = debounce(searchFilms, 1000);

searchInput.addEventListener('keyup', (event) => {
  searchFilms(event.target);
});

function showFoundFilms(response, target) {
  const val = target.value;
  heroesBlock.textContent = '';
  response.forEach(item => {
    if (item.movies && item.movies.join(', ').toLowerCase().includes(val)) {
      console.log(item);
      const heroCard = `
      <div class="hero-card">
      <img src="${item.photo}" alt="hero-avatar" class="hero-avatar">
      <span class="hero-name">${item.name}</span>
      <span class="hero-live-name">${item.actors}</span>
      <span class="hero-status">${item.status}</span>
      <span class="hero-films">${item.movies.join(', ')}</span>
      </div>`;
      heroesBlock.insertAdjacentHTML('beforeend', heroCard);
    }
  })
}
