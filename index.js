const limit = 50;
import { P, createUI, displayData } from "./utils.js";
let count = 0;
const next = document.querySelector(".next");
next.addEventListener("click", function () {
  if (count + limit < 900 - limit && count > -1) {
    count += limit;
  } else if (count + limit == 900 - limit) {
    count = 900 - limit;
  } else if (count + limit == 900) {
    count = 900 - limit;
  }
  displayData(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${count}`);
});

const prev = document.querySelector(".previous");
prev.addEventListener("click", function () {
  if (count - limit > -1) {
    count -= limit;
  }
  displayData(
    `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${
      count - limit > -1 ? count : 0
    }`
  );
});

document.body.onload = function () {
  displayData(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${count}`);
};
