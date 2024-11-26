import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VersionService from "../Services/VersionService";
import PokemonService from "../Services/PokemonService";
import { Container } from "react-bootstrap";
import PokemonCard from "../Components/PokemonCard";

const PokemonByVersion = () => {
    const {name} = useParams();
    const [versionName, setVersionName] = useState("");
    const [pokemons, setPokemons] = useState([]);

    const fetchPokemonByVersion = async () => {
        try {
            const responseVersion = await VersionService.getVersionByName(name);
            setVersionName(responseVersion.data.names[3].name);
            const responseVersionGroup = await VersionService.getVersionGroupByName(responseVersion.data.version_group.name)
            const responseGeneration = await PokemonService.getPokemonByGeneration(responseVersionGroup.data.generation.name)
            setPokemons(responseGeneration.data.pokemon_species);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemonByVersion();
    }, [name])

    return <Container className="d-flex flex-column align-items-center">
        <h1>{versionName}</h1>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            {pokemons.map((pokemon) => {
                return <PokemonCard key={pokemon.name}  pokemonB={pokemon} />
            })}
        </div>
    </Container>;
}
 
export default PokemonByVersion;