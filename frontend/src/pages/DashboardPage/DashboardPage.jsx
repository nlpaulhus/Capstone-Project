import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const DashboardPage = () => {
  const { user, allServices } = useLoaderData();
  const INITIAL_STATE = { servicename: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData({ servicename: e.target.value });
  };

  const onSearchHandler = () => {
    if (formData.servicename !== "") {
      console.log(formData.servicename);
      const servicename = formData.servicename;
      navigate(`/search/${servicename}`);
    }
  };

  return (
    <Container>
      <h1>Welcome, {user.firstname}!</h1>

      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Title> Hire a Crewmember</Card.Title>
              <AllServicesList
                serviceNames={allServices}
                onChangeHandler={onChangeHandler}
                formData={formData}
              />
              <Button onClick={onSearchHandler}>Search</Button>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Title> Your Account</Card.Title>
              <Card.Body>
                <Card.Link href="/account">Edit Account Info</Card.Link>
                <Card.Link href="/yourNetwork">Edit Your Network</Card.Link>
                <Card.Link href="/yourServices">Edit Your Services</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Title>Explore Your Network</Card.Title>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title> Rebook a previous crewmember</Card.Title>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export async function dashboardLoader() {
  try {
    const user = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((user) => user.data);

    const allServices = await axios
      .get(`http://localhost:3000/services`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((allServices) => allServices.data.serviceNames);

    return { user, allServices };
  } catch (err) {
    return redirect("/login");
  }
}
