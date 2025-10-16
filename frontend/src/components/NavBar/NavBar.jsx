import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const API_URL = import.meta.env.VITE_API_URL;

function NavBar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("loggedIn");

  const logoutHandler = async () => {
    try {
      const result = await axios.get(`${API_URL}/logout`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      localStorage.removeItem("loggedIn");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img className="logo" src="/assets/logonobg.png"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href={isLoggedIn ? "/dashboard" : "/"}>Home</Nav.Link>
            {isLoggedIn ? <Nav.Link href="/search">Search</Nav.Link> : null}
            {isLoggedIn ? (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/yourNetwork">
                  Your Network
                </NavDropdown.Item>
                <NavDropdown.Item href="/yourServices">
                  Your Services
                </NavDropdown.Item>
                <NavDropdown.Item href="/account">
                  Your Account
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
            {isLoggedIn ? (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Signup/Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
