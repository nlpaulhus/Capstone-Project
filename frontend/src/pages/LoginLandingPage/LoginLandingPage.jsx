import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./LoginLandingPage.css";

const LoginLandingPage = () => {
  return (
    <Stack gap={3} className="col-md-5 mx-auto" id="loginLandingStack">
      <h1 style={{ textAlign: "center" }}>Get a Grip</h1>
      <Button variant="secondary" size="lg" href="/login/email">
        Login
      </Button>

      <Button variant="primary" size="lg" href="/signup">
        Signup
      </Button>
    </Stack>
  );
};

export default LoginLandingPage;
