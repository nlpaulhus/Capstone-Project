import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AllServicesList from "../../components/AllServicesList/AllServicesList";
import "./DashboardPage.css";

import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
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
      navigate(`/search/?search=${servicename}`);
    }
  };

  return (
    <Stack className="col-md-9 mx-auto" id="dashboardPageStack" gap={3}>
      <h1 style={{ textAlign: "center" }}>Welcome, {user.firstname}!</h1>

      <Stack
        className="col-md-9 mx-auto "
        direction="horizontal"
        alignItems="start"
        gap={3}
      >
        <Card id="dashSearchCard">
          <Card.Title className="cardTitle" style={{ textAlign: "center" }}>
            Hire a Crewmember
          </Card.Title>
          <AllServicesList
            serviceNames={allServices}
            onChangeHandler={onChangeHandler}
            formData={formData}
          />
          <Button onClick={onSearchHandler}>Search</Button>
        </Card>

        <Card id="dashAccountCard" className="text-center">
          <Card.Title className="cardTitle"> Your Account</Card.Title>
          <Card.Body className="d-flex flex-column">
            <a href="/yourNetwork">Edit Your Network</a>
            <a href="/yourServices">Edit Your Services</a>
            <a href="/account">Edit Account Info</a>
          </Card.Body>
        </Card>
      </Stack>
    </Stack>
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
