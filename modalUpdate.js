const modal = document.querySelector(".modal");

async function updatePage(url) {
  const obj = await getDataPage(url);
  const el = await getElementPage(obj);
  displayData(el);
}
async function updateEvL(url) {
  const evDat = await dataEvol(url);
  const evol = document.querySelector(".evol");
  if (evDat.chain?.species?.name !== "eevee") {
    const elEv = getEvolveDataPage(evDat);
    evol.innerHTML += elEv;
  } else if (evDat.chain?.species?.name === "eevee") {
    const eve = getEve(evDat);
    evol.innerHTML += eve;
  }
}
function getDataPage(url) {
  return fetch(url)
    .then((a) => a.json())
    .then((a) => {
      return a;
    });
}

function getElementPage(a) {
  return `<div id="banner">
    <h5>${toUp(a.name)}</h5>
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        a.id
      }.png"
      alt=""
      id="banner"
    />
    </div>
    
    <div class="types">
    <h5>Element</h5>
    <img src="img/${
      a.types[0].type.name
    }.png" alt="" id="element" width="90px" />
    ${
      a.types[1]?.type?.name
        ? `<img src="img/${a.types[1].type.name}.png" alt="" id="element" width="90px"/>`
        : ""
    }
    </div>
    <div class="ev">
    <h5>Base Stats</h5>
    <span>Health: ${a.stats[0].base_stat} </span><span>Attack : ${
    a.stats[1].base_stat
  }</span><span>Defence : ${a.stats[2].base_stat}</span
    ><span>Special Atk : ${a.stats[3].base_stat}</span><span>Special Def : ${
    a.stats[4].base_stat
  }</span>
    <span>Speed : ${a.stats[5].base_stat}</span>
    </div>
    <div class="evol">
    <h4>Evolution</h4>

    </div>
    <a href="#"><button class="close" type="button">Close</button></a>`;
}

function displayData(a) {
  modal.innerHTML = a;
}

function toUp(a) {
  return a[0].toUpperCase() + a.slice(1);
}
document.body.addEventListener("click", async function (e) {
  if (e.target.dataset.name === "eevee") {
  }
  if (e.target.dataset.name) {
    await updatePage(
      `https://pokeapi.co/api/v2/pokemon/${e.target.dataset.name}`
    );
    updateEvL(
      `https://pokeapi.co/api/v2/pokemon-species/${e.target.dataset.name}/`
    );
  }
  if (e.target.dataset.evolution) {
    await updatePage(
      `https://pokeapi.co/api/v2/pokemon/${e.target.dataset.evolution}`
    );
    updateEvL(
      `https://pokeapi.co/api/v2/pokemon-species/${e.target.dataset.evolution}/`
    );
  }
});

async function dataEvol(url) {
  return await fetch(url)
    .then((a) => a.json())
    .then(async (a) => {
      return await fetch(a.evolution_chain.url)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });
    });
}

function getEvolveDataPage(a) {
  let evolve = [];
  if (a.chain?.species?.name !== undefined) {
    evolve.push(
      `<a href="#modalDetail" class="link" data-evolution="${
        a.chain.species.name
      }">${toUp(a.chain.species.name)}</a>`
    );
  }
  if (a.chain?.evolves_to[0]?.species?.name !== undefined) {
    evolve.push(
      `<a href="#modalDetail" class="link" data-evolution="${
        a.chain.evolves_to[0].species.name
      }">${toUp(a.chain.evolves_to[0].species.name)}</a>`
    );
  }
  if (a.chain?.evolves_to[0]?.evolves_to[0]?.species?.name !== undefined) {
    evolve.push(
      `<a href="#modalDetail" class="link" data-evolution="${
        a.chain.evolves_to[0].evolves_to[0]?.species.name
      }">${toUp(a.chain.evolves_to[0].evolves_to[0]?.species.name)}</a>`
    );
  }
  return evolve.join("");
}

function getEve(a) {
  const evolve = [];
  evolve.push(
    `<a href="#modalDetail" class="link" data-evolution="${
      a.chain.species.name
    }">${toUp(a.chain.species.name)}</a>`
  );
  for (let i in a.chain.evolves_to) {
    if (a.chain?.evolves_to[i]?.species?.name) {
      evolve.push(
        `<a href="#modalDetail" class="link" data-evolution="${
          a.chain.evolves_to[i].species.name
        }">${toUp(a.chain.evolves_to[i].species.name)}</a>`
      );
    }
  }
  return evolve.join("");
}
