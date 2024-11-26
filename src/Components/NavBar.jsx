import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypeService from "../Services/TypeService";
import { useEffect, useState } from "react";
import GenerationService from "../Services/GenerationService";

const NavBar = () => {
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [generations, setGenerations] = useState([]);

    const fetchTypes = async () => {
      try {
        const response = await TypeService.getAllType();
        setTypes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchGenerations = async () => {
      try {
        const response = await GenerationService.getAllGeneration();
        setGenerations(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      fetchTypes();
      fetchGenerations();
    }, [])

    return <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => {navigate("/")}}>Pokemons</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate("/pokemons")}}>Pokemons avec Paginations</Nav.Link>
            <NavDropdown title="Types" id="basic-nav-dropdown">
              {types.map((type, index) => {
                return <NavDropdown.Item key={type.name + "nav"} 
                  onClick={() => {navigate("/type/"+type.name)}} >
                  {type.name}
                </NavDropdown.Item>
              })}
            </NavDropdown>
            <NavDropdown title="Générations" id="basic-nav-dropdown-bis">
              {generations.map((generation) => {
                return <NavDropdown.Item key={generation.name + "nav"} 
                  onClick={() => {navigate("/generation/"+generation.name)}} >
                  {generation.name}
                </NavDropdown.Item>
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>;
}
 
export default NavBar;