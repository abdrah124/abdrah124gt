function P(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const promises = data.results.map(async (result) => {
        const response = await fetch(result.url);
        return response.json();
      });
      return Promise.all(promises);
    });
}

function createUI(pokemonData) {
  return pokemonData
    .map((e, i) => {
      return `
      <tr> 
        <td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${
          e.id ? e.id : "25"
        }.png" alt="${e.name}">
       </td> 
         <td>0${
           e.id
         }</td> <td><a href="#modalDetail"><span class="pokelist po" data-name="${
        e.name
      }" data-id="${e.id}">${toUp(e.name)}</span></a></td>
          <td>
          <img src="img/${e.types[0].type.name}.png" alt="${
        e.types[0].type.name
      }" width="95px"> 
          <br>
          ${
            e.types[1]?.type?.name !== undefined
              ? `<img src="img/${e.types[1].type.name}.png" alt="${e.types[1].type.name}" width="95px">`
              : ``
          }
        </td>
      </tr>`;
    })
    .join("");
}

async function displayData(url) {
  const data = await P(url);
  const UI = await createUI(data);
  const list = document.querySelector(".pokelist tbody");
  list.innerHTML = UI;
}
displayData();

export { P, createUI, displayData };
function toUp(a) {
  return a[0].toUpperCase() + a.slice(1);
}
