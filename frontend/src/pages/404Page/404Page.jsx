import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Stack gap={3} className="col-md-5 mx-auto" id="loginLandingStack">
      <h1 style={{ textAlign: "center" }}>Oops! That page can't be found!</h1>
      <Button variant="secondary" size="md" onClick={() => navigate(-1)}>
        Return To Previous Page
      </Button>

      <Button variant="primary" size="md" href="/">
        Home
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
