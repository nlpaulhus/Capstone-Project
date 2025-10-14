import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YourServicesPage } from "./YourServices.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const loaderData = {
  allServices: ["Baking", "Art", "Pet Sitting"],
  yourServices: [
    {
      id: "5495f1cd-5e90-4c05-bbec-a0338308b16b",
      userid: "901f959f-7f9e-461d-ae57-a5780323e313",
      servicename: "Childcare",
      description: "Will babysit your little ones!",
      price: 20,
      paymenttype: "hourly",
    },
    {
      id: "8fa8cc37-e018-4e11-b00d-a44fad9f0262",
      userid: "901f959f-7f9e-461d-ae57-a5780323e313",
      servicename: "Furniture Assembly",
      description: "Love to build Ikea stuff",
      price: 20,
      paymenttype: "hourly",
    },
    {
      id: "c467b749-e0cb-4fef-8d53-21ee79b132b7",
      userid: "901f959f-7f9e-461d-ae57-a5780323e313",
      servicename: "Hair",
      description: "I'll cut your hair! $50/cut",
      price: 50,
      paymenttype: "flatrate",
    },
  ],
};

const router = createMemoryRouter([
  {
    id: "main", // Important: Match the ID of the route where your component is rendered
    path: "/",
    element: <YourServicesPage />,
    loader: async () => loaderData,
  },
]);

describe("Dashboard", () => {
  it("renders the dashboard page", async () => {
    render(<RouterProvider router={router} />);
    const directions = screen.getByText("Select, add and edit your services.");
    const serviceName = screen.getByText("Hair");
    const selectService = screen.getByText("Select A Service");
  });
});
