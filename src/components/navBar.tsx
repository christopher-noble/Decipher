import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import "./styles/navBarStyles.css";

const NavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary navBar">
            <Container className='navBar-container'>
                <Navbar.Brand as={NavLink} to="/">
                    <div className='logo-area'>
                        <a href='/'><img src='./logo-no-background.png' alt='decipher-logo'></img></a>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle className='navbar-dark' aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/transcribe">Transcribe</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;