import axios from "axios";

function getTypeByURL(url){
    return axios.get(url);
}

export default {   
    getTypeByURL
}