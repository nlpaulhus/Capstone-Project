import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post("http://localhost:3000/login", loginData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(result);
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
