import axios from 'axios';

function getAllPokemon(){
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=50000');
}

function getPokemonPagination(limit, offset){
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset);
}

function getPokemonDetail(name){
    return axios.get('https://pokeapi.co/api/v2/pokemon/'+name);
}

function getPokemonSpecieDetail(name){
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/'+name);
}

function getPokemonByType(type){
    return axios.get('https://pokeapi.co/api/v2/type/'+type);
}

export default {
    getAllPokemon,
    getPokemonPagination,
    getPokemonDetail,
    getPokemonSpecieDetail,
    getPokemonByType
}