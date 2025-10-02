import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:3000/login",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.setItem("loggedIn", true);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.response.data.error);
    }
  };

  return (
    <Stack className="col-md-5 mx-auto" id="loginPageStack">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={onChangeHandler}
            value={loginData.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={onChangeHandler}
            value={loginData.password}
          />
        </Form.Group>
        <Stack direction="horizontal" className="col-md-5 mx-auto" gap={3}>
          <Button type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Stack>
      </Form>
      <span style={{ color: "red" }}>{formError}</span>
    </Stack>
  );
}

export default LoginPage;
