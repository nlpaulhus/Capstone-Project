import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
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
      navigate("/");
    } catch (err) {
      setFormError(err.response.data.error);
    }
  };

  return (
    <div className="col-md-5 mx-auto">
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
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Button type="button" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </Form>
      <span style={{ color: "red" }}>{formError}</span>
    </div>
  );
}

export default LoginPage;
