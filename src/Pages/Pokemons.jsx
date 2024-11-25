import { Container, Form } from "react-bootstrap";
import PokemonService from "../Services/PokemonService";
import { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const fetchPokemons = async () => {
        try {
            const response = await PokemonService.getAllPokemon();
            setPokemons(response.data.results);
            setFilteredPokemons(response.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchPokemons();
    }, []);

    useEffect(() => {
        const filteredPokemons = pokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
            // return pokemon.name.toUpperCase().includes(searchValue.toUpperCase());
        })
        setFilteredPokemons(filteredPokemons);
        
    }, [searchValue])

    return <Container className="d-flex flex-column align-items-center">
        <h1>Pokemons</h1>
        <Form className="col-11 m-2">
            <Form.Control type="text" placeholder="Search" onChange={handleChange} value={searchValue}/>
        </Form>
        <div className="d-flex flex-wrap justify-content-center gap-3">
            {filteredPokemons.map((pokemon) => {
                return <PokemonCard key={pokemon.name} pokemonB={pokemon} />
            })}
        </div>
    </Container>;
}
 
export default Pokemons;