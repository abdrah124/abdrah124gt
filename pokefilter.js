const buttonSrc = document.querySelector(".button");
const seVal = document.querySelector(".search");
const table = document.querySelector(".pokelist tbody");
buttonSrc.addEventListener("click", async function () {
  try {
    if (
      seVal.value === undefined ||
      seVal.value.length == 0 ||
      seVal.value == ""
    ) {
      throw new Error("Can't found the Pokemon");
    }
    const UI = await fetch(`https://pokeapi.co/api/v2/pokemon/${seVal.value.toLowerCase()}`)
      .then((a) => {
        if (!a.ok) {
          throw new Error("Can't found the Pokemon");
        }
        return a.json();
      })
      .then((e) => {
        if (e === undefined) {
          throw new Error("Can't found the Pokemon");
        }
        return ` <tr> 
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
      });
    table.innerHTML = UI;
  } catch (err) {
    seVal.value = err.message;
    setTimeout(() => {
      seVal.value = "";
    }, 2000);
  }
});
