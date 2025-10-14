import { render, screen, fireEvent } from "@testing-library/react";
import { LandingPage } from "./LandingPage.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const loaderData = {
  currentServices: ["Baking", "Childcare", "Art"],
};

const router = createMemoryRouter([
  {
    id: "main", // Important: Match the ID of the route where your component is rendered
    path: "/",
    element: <LandingPage />,
    loader: async () => loaderData,
  },
]);

describe("Landing Page", () => {
  it("renders the landing page", async () => {
    render(<RouterProvider router={router} />);
    const button = screen.getByText("Sign Up or Login");
    const service = screen.getByText("Baking");
  });
});
