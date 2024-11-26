import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PokemonService from "../services/PokemonService";
import { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";

const PokemonByGeneration = () => {
    const {name} = useParams();
    const [generation, setGeneration] = useState({});

    const fetchPokemonByGeneration = async () => {
        try {
            const response = await PokemonService.getPokemonByGeneration(name)
            setGeneration(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemonByGeneration();
    }, []);

    return <Container className="d-flex flex-column align-items-center">
        <h1>{generation.names && generation.names[3].name}</h1>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            {generation.pokemon_species && generation.pokemon_species.map((pokemon) => {
                return <PokemonCard key={pokemon.name} pokemonB={pokemon} />
            })}
        </div>
    </Container>;
}
 
export default PokemonByGeneration;