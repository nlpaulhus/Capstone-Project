import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./YourServicesPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";

import AllServicesList from "../../components/AllServicesList/AllServicesList";

export const YourServicesPage = () => {
  const allServices = useLoaderData();
  const [formData, setFormData] = useState();

  const selectService = (e) => {
    console.log(e.target.value);
  };

  return (
    <div id="yourServicesPage">
      <p>Select, add and edit your services.</p>
      <div id="yourServicesActiveArea">
        <div id="yourServicesForm">
          <Form>
            <AllServicesList
              serviceNames={allServices}
              onChangeHandler={selectService}
            />
            <Form.Group className="mb-3" controlId="serviceDescription">
              <Form.Label>
                Add a Personalized Description of Your Service
              </Form.Label>
              <Form.Control as="textarea" rows="5"></Form.Control>
            </Form.Group>

            <Form.Label>Your Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                type="number"
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>

            <div className="mb-3">
              <Form.Check className="mb-3" inline>
                <Form.Check.Input />
                <Form.Check.Label>Hourly</Form.Check.Label>
              </Form.Check>

              <Form.Check className="mb-3" inline>
                <Form.Check.Input />
                <Form.Check.Label>Per Project</Form.Check.Label>
              </Form.Check>
            </div>
            <Button>ADD</Button>
          </Form>
        </div>
        <div id="yourServices">
          <h1>your services will be here</h1>
        </div>
      </div>
    </div>
  );
};

export async function yourServicesLoader({ params }) {
  const userId = params.userId;

  try {
    const allServices = await axios.get(`http://localhost:3000/services`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return allServices.data.serviceNames;
  } catch (err) {
    console.log(err);
  }
}
