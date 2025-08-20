import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./YourServicesPage.css";
import YourServicesForm from "../../components/YourServicesForm/YourServicesForm";

export const YourServicesPage = () => {
  const allServices = useLoaderData();
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
