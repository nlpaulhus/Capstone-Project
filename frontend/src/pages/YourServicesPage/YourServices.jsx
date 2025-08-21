import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./YourServicesPage.css";
import YourServicesForm from "../../components/YourServicesForm/YourServicesForm";
import ServiceBox from "../../components/ServiceBox/ServiceBox";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";

export const YourServicesPage = () => {
  const loaderData = useLoaderData();
  const allServices = loaderData.allServices;
  const yourServices = loaderData.yourServices;
  const params = useParams();
  const userId = params.userId;

  const INITIALSTATE = {
    id: "",
    servicename: "",
    description: "",
    price: 0,
    paymentType: "",
  };

  const ERRORSINITIAL = {
    serviceName: "",
    description: "",
    price: "",
    paymentType: "",
    form: "",
  };

  const [formData, setFormData] = useState(INITIALSTATE);
  const [formErrors, setFormErrors] = useState(ERRORSINITIAL);

  const onChangeHandler = (e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    if (inputId === "price" && inputValue < 0) {
      setFormErrors({
        ...ERRORSINITIAL,
        price: "Price must be a positive whole number.",
      });
    } else if (
      inputId === "price" &&
      Number.isInteger(Number(inputValue)) === false
    ) {
      setFormErrors({
        ...ERRORSINITIAL,
        price: "Price must be a positive whole number.",
      });
    } else if (inputId === "price") {
      setFormErrors({ ...formErrors, price: "" });
      setFormData({ ...formData, price: inputValue });
    }

    if (inputId === "hourly" || inputId === "perProject") {
      setFormData({ ...formData, paymentType: inputId });
    } else {
      setFormData({ ...formData, [inputId]: inputValue });
    }
  };

  const formSubmitHandler = (e) => {
    if (
      formData.servicename === "" ||
      formData.description === "" ||
      !formData.price > 0 ||
      formData.paymentType == ""
    ) {
      return setFormErrors({
        ...formErrors,
        form: "Please complete all fields.",
      });
    } else {
      yourServices.push({
        ...formData,
        price: parseInt(formData.price),
        id: formData.id === "" ? uuidv4() : formData.id,
      });
      setFormData(INITIALSTATE);
      setFormErrors(ERRORSINITIAL);
    }
  };

  const nextButtonHandler = async () => {
    const result = await axios.post(
      `http://localhost:3000/userServices/${userId}`,
      { yourServices },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(result);
  };

  const RemoveButtonHandler = async () => {};

  return (
    <div id="yourServicesPage">
      <p>Select, add and edit your services.</p>
      <div id="yourServicesActiveArea">
        <div id="yourServicesForm">
          <YourServicesForm
            allServices={allServices}
            formData={formData}
            onChangeHandler={onChangeHandler}
            onSubmit={formSubmitHandler}
          />

          {Object.keys(formErrors).map((keyName, i) => (
            <span key={i} style={{ color: "red" }}>
              {formErrors[keyName]}
            </span>
          ))}
        </div>
        <div id="yourServices">
          <h3>Your Services</h3>
          <div id="yourServicesList">
            {yourServices.map((service, index) => (
              <ServiceBox key={index} service={service} />
            ))}
          </div>
          <Button onClick={nextButtonHandler}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export async function yourServicesLoader({ params }) {
  const userId = params.userId;

  try {
    const [response1, response2] = await Promise.all([
      axios.get(`http://localhost:3000/services`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }),
      axios.get(`http://localhost:3000/userServices/${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }),
    ]);

    const allServices = response1.data.serviceNames;
    const yourServices = response2.data.yourServices;

    return {
      allServices: allServices,
      yourServices: yourServices,
    };
  } catch (err) {
    console.log(err);
  }
}
