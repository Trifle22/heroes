
const request = new XMLHttpRequest();

request.open('GET', './dbHeroes.json');

request.send();

request.addEventListener('readystatechange', (event) => {
  if (request.readyState === 4) {
    showHeroes(JSON.parse(request.response))
  }
})

function showHeroes(heroes) {
  console.log(heroes);
  const heroesBlock = document.querySelector('.heroes-cards')
  heroes.forEach(hero => {
    const heroCard = `
    <div class="hero-card">
    <img src="${hero.photo}" alt="hero-avatar" class="hero-avatar">
    <span class="hero-name">${hero.name}</span>
    <span class="hero-live-name">${hero.actors}</span>
    <span class="hero-status">${hero.status}</span>
    </div>`;
    heroesBlock.insertAdjacentHTML('beforeend', heroCard);
    const filmListElement = `<ul></ul>`
    hero.movies.forEach(item => {
      const filmElement = `<li>${item}</li>`
      filmListElement.appendChild(filmElement);
    })
    heroesBlock.insertAdjacentHTML('beforeend', filmListElement)
  })
}