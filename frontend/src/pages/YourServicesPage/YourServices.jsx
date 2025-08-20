import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./YourServicesPage.css";
import YourServicesForm from "../../components/YourServicesForm/YourServicesForm";

export const YourServicesPage = () => {
  const loaderData = useLoaderData();
  const allServices = loaderData.allServices;
  const yourServices = loaderData.yourServices;
  console.log(yourServices);

  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: 0,
    paymentType: "",
  });

  const onChangeHandler = (e) => {
    if (e.target.id === "hourly" || e.target.id === "perProject") {
      setFormData({ ...formData, paymentType: e.target.id });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    console.log(formData);
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
          />
        </div>
        <div id="yourServices">
          <h1>your services will be here</h1>
          {yourServices.map((service) => (
            <p>{service.serviceName}</p>
          ))}
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
