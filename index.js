import { P, createUI, displayData } from "./utils.js";

document.body.onload = function () {
  displayData(`https://pokeapi.co/api/v2/pokemon?limit=898&offset=0`);
};
