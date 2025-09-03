import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./YourServicesPage.css";
import YourServicesForm from "../../components/YourServicesForm/YourServicesForm";
import ServiceBox from "../../components/ServiceBox/ServiceBox";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";

export const YourServicesPage = () => {
  const loaderData = useLoaderData();
  const allServices = loaderData.allServices;
  const originalServices = loaderData.yourServices;
  const userId = loaderData.userId;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userId === null) {
      navigate("/login/email", { state: { from: location } });
      return null;
    }
  }, []);

  const INITIALSTATE = {
    id: "",
    servicename: "",
    description: "",
    price: 0,
    paymenttype: "",
  };

  const ERRORSINITIAL = {
    serviceName: "",
    description: "",
    price: "",
    paymenttype: "",
    form: "",
  };

  const [formData, setFormData] = useState(INITIALSTATE);
  const [formErrors, setFormErrors] = useState(ERRORSINITIAL);
  const [yourServices, setYourServices] = useState(originalServices);

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
      setFormData({ ...formData, paymenttype: inputId });
    } else {
      setFormData({ ...formData, [inputId]: inputValue });
    }
  };

  const formSubmitHandler = (e) => {
    if (
      formData.servicename === "" ||
      formData.description === "" ||
      !formData.price > 0 ||
      formData.paymenttype == ""
    ) {
      return setFormErrors({
        ...formErrors,
        form: "Please complete all fields.",
      });
    } else {
      const newService = {
        ...formData,
        price: parseInt(formData.price),
        id: formData.id === "" ? uuidv4() : formData.id,
      };

      setYourServices([...yourServices, newService]);
      setFormData(INITIALSTATE);
      setFormErrors(ERRORSINITIAL);
    }
  };

  const nextButtonHandler = async () => {
    const servicesToAdd = [];
    for (let service of yourServices) {
      servicesToAdd.push({
        ...service,
        servicename: service.servicename,
      });
    }

    const result = await axios.post(
      `http://localhost:3000/userServices`,
      { servicesToAdd, userId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return navigate(`/dashboard`);
  };

  const removeButtonHandler = async (e) => {
    const serviceId = e.target.id;

    const isInDatabase = originalServices.filter(
      (service) => service.id === serviceId
    );

    if (isInDatabase) {
      try {
        const result = await axios.get(
          `http://localhost:3000/userServices/delete/${serviceId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    const newYourServices = yourServices.filter(
      (service) => service.id !== serviceId
    );
    setYourServices(newYourServices);
  };

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
              <ServiceBox
                key={index}
                service={service}
                removeButtonHandler={removeButtonHandler}
              />
            ))}
          </div>
          <Button onClick={nextButtonHandler}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export async function yourServicesLoader() {
  try {
    const user = await axios.get("http://localhost:3000/user", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const userId = user.data.userid;

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
      userId: userId,
    };
  } catch (err) {
    console.log(err);
    return {
      allServices: [],
      yourServices: [],
      userId: null,
    };
  }
}
