import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const LoginLandingPage = () => {
  return (
    <Stack gap={3} className="col-md-5 mx-auto">
      <h1 className="align-center">Get a Grip</h1>
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
