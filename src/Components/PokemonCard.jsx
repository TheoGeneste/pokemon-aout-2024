import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({pokemonB}) => {
    const navigate = useNavigate();

    return <>
        <Card style={{ width: '18rem' }} onClick={() => {navigate("/pokemon/"+pokemonB.name)}}>
            <Card.Img variant="top" src={"https://img.pokemondb.net/artwork/"+pokemonB.name+".jpg"} />
            <Card.Body>
                {/* https://pokeapi.co/api/v2/pokemon/808/ */}
                {/* 808/ */}
                <Card.Title>{pokemonB.name} #{pokemonB.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")}</Card.Title>
                {/* <Button variant="primary">Voir le Pokemon</Button> */}
            </Card.Body>
        </Card>
    </>;
}

export default PokemonCard;