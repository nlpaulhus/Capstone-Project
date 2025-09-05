import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("loggedIn");



  const logoutHandler = async () => {
    try {
      const result = await axios.get("http://localhost:3000/logout", {
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
        <Navbar.Brand href="/">Get a Grip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
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
