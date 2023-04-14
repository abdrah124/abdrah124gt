const limit = 50;
import { P, createUI, displayData } from "./utils.js";
let count = 0;
const popkedexLimit = 900;
let paging = 1;
const pagination = popkedexLimit / limit;
const paginValue = document.querySelector(".paginvalue");
const next = document.querySelector(".next");
next.addEventListener("click", async function () {
  if (count + limit < popkedexLimit - limit && count > -1) {
    count += limit;
    paging += 1;
  } else if (count + limit == popkedexLimit - limit) {
    count = popkedexLimit - limit;
    paging !== pagination ? (paging += 1) : paging;
    displayPagin();
  } else if (count + limit == popkedexLimit) {
    count = popkedexLimit - limit;
    paging !== pagination ? (paging += 1) : paging;
    displayPagin();
  }
  await displayData(
    `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${count}`
  );
  displayPagin();
});

const prev = document.querySelector(".previous");
prev.addEventListener("click", async function () {
  if (count - limit > -1) {
    count -= limit;
    paging -= 1;
    displayPagin();
  }
  await displayData(
    `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${
      count - limit > -1 ? count : 0
    }`
  );
});

document.body.onload = function () {
  displayData(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${count}`);
  displayPagin();
};

function displayPagin() {
  paginValue.innerHTML = `Pages ${paging} of ${pagination} `;
}
