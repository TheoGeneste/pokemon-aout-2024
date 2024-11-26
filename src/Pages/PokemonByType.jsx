import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PokemonService from "../Services/PokemonService";
import { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";

const PokemonByType = () => {
    const {name} = useParams();
    const [type, setType] = useState({});

    const fetchPokemonByType = async () => {
        try {
            const response = await PokemonService.getPokemonByType(name)
            setType(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemonByType();
    }, [name])

    return <Container className="d-flex flex-column align-items-center">
        <h1>{type.names && type.names[3].name}</h1>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            {type.pokemon && type.pokemon.map((pokemon) => {
                return <PokemonCard key={pokemon.pokemon.name} pokemonB={pokemon.pokemon} />
            })}
        </div>
    </Container>;
}
 
export default PokemonByType;