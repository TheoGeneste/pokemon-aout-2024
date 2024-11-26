import axios from "axios";

function getAllHabitat() {
  return axios.get("https://pokeapi.co/api/v2/pokemon-habitat/");
}

function getHabitatByName(name) {
    return axios.get("https://pokeapi.co/api/v2/pokemon-habitat/"+name);
}

export default { getAllHabitat, getHabitatByName };