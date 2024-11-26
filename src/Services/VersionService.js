import axios from "axios";

function getAllVersion(){
    return axios.get("https://pokeapi.co/api/v2/version?limit=100");
}

function getVersionByName(name){
    return axios.get("https://pokeapi.co/api/v2/version/"+name);
}

function getVersionGroupByName(name){
    return axios.get("https://pokeapi.co/api/v2/version-group/"+name);
}

export default {
    getAllVersion,
    getVersionByName,
    getVersionGroupByName
};