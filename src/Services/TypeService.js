import axios from "axios";

function getTypeByURL(url){
    return axios.get(url);
}

function getAllType(){
    return axios.get("https://pokeapi.co/api/v2/type?limit=50");
}

export default {   
    getTypeByURL,
    getAllType
}