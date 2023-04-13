const modal = document.querySelector(".modal");
let url = "https://pokeapi.co/api/v2/pokemon/pikachu";
async function updatePage(url) {
  const page = await getDataPage(url);
  const updatePage = getUpdatePage(page);
  const evolData = await evolveData(url);
  getEvolveDataPage(evolData);
}

function toUp(a) {
  return a[0].toUpperCase() + a.slice(1);
}

function evolveData(url) {
  return fetch(url)
    .then((a) => a.json())
    .then((a) => {
      let evolution = a.species.url;
      return fetch(evolution)
        .then((a) => a.json())
        .then((a) => {
          console.log(a);
          return fetch(a.evolution_chain.url)
            .then((a) => a.json())
            .then((a) => {
              return a;
            });
        });
    });
}

// update Pages
function getDataPage(url) {
  return fetch(url)
    .then((a) => a.json())
    .then((a) => {
      console.log(a);
      return a;
    });
}

function getUpdatePage(a) {
  let moves = a.moves.map((a) => `<li>${toUp(a.move.name)}</li>`).join("");
  let stats = a.stats
    .map((a) => `<li>${toUp(a.stat.name)} : ${a.base_stat}</li>`)
    .join("");
  let abilities = a.abilities
    .map((a) => `<li>${toUp(a.ability.name)}</li>`)
    .join("");
  return (modal.innerHTML = `
    <input type="search" placeholder="Search..." class="search" />
    <button type="button" class="button">Search</button>
    <h1 class="pokemon">${toUp(a.name)}</h1>
    <div class="sprites"><img src="${a.sprites.front_default}" alt=""></div>
    <h4>Types: ${toUp(a.types[0].type.name)}</h4>
    <div class="evolution"></div>
    <h2>Abilities</h2>
    <ul>${abilities}</ul>
    <h2>Base Stats</h2>
    <ul>${stats}</ul>
    <h2>Moves</h2> 
    <ul>${moves}</ul>`);
}

function getEvolveDataPage(a) {
  let evolve = [];
  if (a.chain?.species?.name !== undefined) {
    evolve.push(
      `<li><a href="https://pokeapi.co/api/v2/pokemon/${
        a.chain.species.name
      }" class="link">${toUp(a.chain.species.name)}</a></li>`
    );
  }
  if (a.chain?.evolves_to[0]?.species?.name !== undefined) {
    evolve.push(
      `<li><a href="https://pokeapi.co/api/v2/pokemon/${
        a.chain.evolves_to[0].species.name
      }" class="link">${toUp(a.chain.evolves_to[0].species.name)}</a></li>`
    );
  }
  if (a.chain?.evolves_to[0]?.evolves_to[0]?.species?.name !== undefined) {
    evolve.push(
      `<li><a href="https://pokeapi.co/api/v2/pokemon/${
        a.chain.evolves_to[0].evolves_to[0]?.species.name
      }" class="link">${toUp(
        a.chain.evolves_to[0].evolves_to[0]?.species.name
      )}</a></li>`
    );
  }
  const evo = document.querySelector(".evolution");
  return (evo.innerHTML = `<h2>Evolution Chain</h2>
<ul>${evolve.join("")}</ul>`);
}

document.body.addEventListener("click", function (e) {
  if (e.target.className == "link") {
    updatePage(e.target.getAttribute("href"));
    e.preventDefault();
  }
  if (e.target.className === "button") {
    updatePage(
      `https://pokeapi.co/api/v2/pokemon/${e.target.previousElementSibling.value}`
    );
  }
  if (e.target.classList.contains("pokelist")) {
    updatePage(`https://pokeapi.co/api/v2/pokemon/${e.target.dataset.name}`);
  }
});

fetch("https://pokeapi.co/api/v2/pokemon-species/132/")
  .then((a) => a.json)
  .then((a) =>
    fetch(a.evolution_chain.url)
      .then((res) => res.json)
      .then((res) => {
        console.log(res);
        return res;
      })
  );
