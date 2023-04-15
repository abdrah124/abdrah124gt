const buttonSrc = document.querySelector(".button");
const seVal = document.querySelector(".search");
const table = document.querySelector(".pokelist tbody");

const url = `https://pokeapi.co/api/v2/pokemon?limit=900&offset=0`;
buttonSrc.addEventListener("click", function () {
  getDataSearch();
});

seVal.addEventListener("input", function () {
  getDataSearch();
});

function getDataSearch() {
  const dataName = document.querySelectorAll("tbody tr");
  const dataFilter = Array.from(dataName)
    .map((e) => e)
    .filter((e) =>
      e.children[2].children[0].children[0].dataset.name.startsWith(seVal.value.toLowerCase())
    )
    .sort((x, y) => {
      if (
        y.children[2].children[0].children[0].dataset.name >
        x.children[2].children[0].children[0].dataset.name
      ) {
        return -1;
      }
      if (
        x.children[2].children[0].children[0].dataset.name >
        y.children[2].children[0].children[0].dataset.name
      ) {
        return 1;
      }
      return 0;
    })
    .map((e) => {
      table.insertBefore(e, dataName[0]);
    });

  if (seVal.value == "") {
    const dataName = document.querySelectorAll("tbody tr");
    const dataFilter = Array.from(dataName)
      .map((e) => {
        return e;
      })
      .sort(
        (a, b) =>
          a.children[2].children[0].children[0].dataset.id -
          b.children[2].children[0].children[0].dataset.id
      )
      .map((e) => e.outerHTML)
      .join("");
    table.innerHTML = dataFilter;
  }
}

function createUI(filterData) {
  return filterData.map(
    (e) => ` <tr data-name="${e.name}"> 
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
