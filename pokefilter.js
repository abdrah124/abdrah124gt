const buttonSrc = document.querySelector(".button");
const seVal = document.querySelector(".search");
const table = document.querySelector(".pokelist tbody");

const url = `https://pokeapi.co/api/v2/pokemon?limit=900&offset=0`;
buttonSrc.addEventListener("click", async function () {
  const data = await getSearchData(url);
  const filterData = await filterSearchData(data, seVal.value);
  const UI = await createUI(filterData).join("");
  table.innerHTML = UI;
});

function getSearchData(url) {
  return fetch(url)
    .then((a) => a.json())
    .then((a) => {
      const promises = a.results.map(async (a) => {
        const r = await fetch(a.url);
        return r.json();
      });
      return Promise.all(promises);
    });
}
function filterSearchData(data, input) {
  return data.filter((a) => {
    return a.name.startsWith(input);
  });
}
async function testing() {
  const data = await getSearchData(url);
  const filterData = await filterSearchData(data, "yve");
  const UI = await createUI(filterData).join("");
  table.innerHTML = UI;
}
function createUI(filterData) {
  return filterData.map(
    (e) => ` <tr> 
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
</tr>`
  );
}
