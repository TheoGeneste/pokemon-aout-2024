import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PokemonService from "../Services/PokemonService";
import { useEffect, useState } from "react";
import TypeService from "../Services/TypeService";
import CanvasJSReact from '@canvasjs/react-charts';

const PokemonDetails = () => {
    const {name} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [stats, setStats] = useState([]);
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark1", //"light1", "dark1", "dark2"
        title:{
            text: "Statistique de "+name
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: stats
        }]
    }

    const fetchPokemon = async () => {
        try {
            const responseDetail = await PokemonService.getPokemonDetail(name);
            const responseSpecie = await PokemonService.getPokemonSpecieDetail(name);
            const responseType = await TypeService.getTypeByURL(responseDetail.data.types[0].type.url);

            setPokemon({...responseType.data,...responseDetail.data, ...responseSpecie.data});
            
            const statTab = [];
            responseDetail.data.stats.map((stat) => {
                statTab.push({label : stat.stat.name, y : stat.base_stat});
            })

            setStats(statTab);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [])

    
    return <Container className="d-flex flex-column align-items-center">
        <h1>{pokemon.names && pokemon.names[4].name.slice(0, 1).toUpperCase()}{pokemon.names && pokemon.names[4].name.slice(1) }</h1>
        <div className="d-flex gap-2 col-12">
            <div id="gauche" className="col-5 d-flex flex-column align-items-center">
                <div id="img">
                     <img src={"https://img.pokemondb.net/artwork/"+name+".jpg"} alt="" />
                     {/* <img width={500} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.id+".png"} alt="" /> */}
                </div>
                <div id="stats" className="col-12">
                    <CanvasJSChart options = {options} />
                </div>
            </div>
            <div id="droite" className="col-5 d-flex flex-column align-items-center">
                <p id="description">{pokemon.flavor_text_entries && pokemon.flavor_text_entries[16].flavor_text}</p>
                <div id="games" className="d-flex gap-1 flex-wrap">
                    {pokemon.game_indices && pokemon.game_indices.map((game) => {
                        return <button key={game.version.name} className={game.version.name+" button"}>{game.version.name}</button>
                    })}
                </div>
                <div id="global-info" className="d-flex col-12 justify-content-between bg-primary mt-3 gap-2">
                    <div id="infos" className="d-flex flex-column col-5">
                        <h3>Taille :</h3>
                        <p>{pokemon.height}</p>
                        <h3>Poids</h3>
                        <p>{pokemon.weight}</p>
                    </div>
                    <div className="col-5 d-flex flex-column gap-2 align-items-center">
                        <h3>Compétences</h3>
                        {pokemon.abilities && pokemon.abilities.map((ability) => {
                            return <button className="button" key={ability.ability.name}>{ability.ability.name}</button>    
                        })}
                    </div>
                </div>
                <div id="types" className="d-flex flex-column col-12">
                    <h3>Types : </h3>
                    <div className="d-flex flex-wrap gap-2">
                        {pokemon.types && pokemon.types.map((type) => {
                            return <button className={type.type.name + " button"} key={type.type.name}>{type.type.name}</button>
                        })}
                    </div>
                </div>
                <div id="faiblesses" className="d-flex flex-column col-12">
                    <h3>Faiblesses : </h3>
                    <div className="d-flex flex-wrap gap-2">
                        {pokemon.damage_relations && pokemon.damage_relations.double_damage_from.map((faiblesse) => {
                            return <button className={faiblesse.name + " button"} key={faiblesse.name}>{faiblesse.name}</button>
                        })}
                    </div>
                </div>
                <div id="points-fort" className="d-flex flex-column col-12">
                    <h3>Fort Contre : </h3>
                    <div className="d-flex flex-wrap gap-2">
                        {pokemon.damage_relations && pokemon.damage_relations.double_damage_to.map((fort) => {
                            return <button className={fort.name + " button"} key={fort.name}>{fort.name}</button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </Container>;
}
 
export default PokemonDetails;