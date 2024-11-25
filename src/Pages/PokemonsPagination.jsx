import { Container, Form, Pagination } from "react-bootstrap";
import PokemonService from "../Services/PokemonService";
import { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";

const PokemonsPagination = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const limit = 24;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);
    
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const fetchPokemons = async () => {
        try {
            const offset = (currentPage - 1) * limit;
            const response = await PokemonService.getPokemonPagination(limit, offset);
            setMaxPage(Math.ceil(response.data.count / limit));
            
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

    useEffect(() => {
        fetchPokemons();
        setSearchValue("");
    }, [currentPage])

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

        <Pagination className="m-3">
            {currentPage - 1 >= 1 && <>
                <Pagination.First onClick={() => {setCurrentPage(1)}}/>
                <Pagination.Prev onClick={() => {setCurrentPage(currentPage - 1)}}/>
            </>}
            
            {currentPage - 5 >= 1 && 
                <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage - 5)}}/>
            }

            {currentPage - 1 >=1 && <>
                <Pagination.Item onClick={() => {setCurrentPage(currentPage - 1)}}>{currentPage - 1}</Pagination.Item>
            </>}

            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage + 1 <= maxPage && <>
                <Pagination.Item onClick={() => {setCurrentPage(currentPage + 1)}}>{currentPage +1}</Pagination.Item>
            </>}

            {currentPage + 5 <= maxPage && <>
                <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage + 5)}}/>
            </>}

            {currentPage + 1 <= maxPage && <>
                <Pagination.Next onClick={() => {setCurrentPage(currentPage + 1)}}/>
                <Pagination.Last onClick={() => {setCurrentPage(maxPage)}}/>
            </>}
            
        </Pagination>
    </Container>;
}
 
export default PokemonsPagination;