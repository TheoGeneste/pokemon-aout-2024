import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HabitatService from "../Services/HabitatService";
import PokemonCard from "../Components/PokemonCard";

const PokemonByHabitat = () => {
    const {name} = useParams();
    const [habitat, setHabitat] = useState({});
    const fetchHabitat = async () => {
        try {
            const response = await HabitatService.getHabitatByName(name);
            setHabitat(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHabitat();
    },[name])
    return <Container className="d-flex flex-column align-items-center">
        <h1>{habitat.names && habitat.names[0].name}</h1>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            {habitat.pokemon_species && habitat.pokemon_species.map((pokemon) => {
                return <PokemonCard key={pokemon.name} pokemonB={pokemon} />
            })}
        </div>
    </Container>;
}
 
export default PokemonByHabitat;