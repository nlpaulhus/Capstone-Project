import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardPage } from "./DashboardPage.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const loaderData = {
  user: {
    city: "Los Angeles",
    email: "kris@yay.com",
    firstname: "Herbert",
    geom: "0101000020E6100000774B72C0AE0E414021E868554B8C5DC0",
    imdbname: "nm4218082",
    lat: 34.114708,
    lng: -118.192098,
    profilephoto: "https://avatars.githubusercontent.com/u/18086342",
    userid: "7dd800f9-6db9-4611-9e32-1fa92ac61cde",
    zip: "90042",
  },
  allServices: ["Baking", "Childcare", "Art"],
};

const router = createMemoryRouter([
  {
    id: "main", // Important: Match the ID of the route where your component is rendered
    path: "/",
    element: <DashboardPage />,
    loader: async () => loaderData,
  },
]);

describe("Dashboard", () => {
  it("renders the dashboard page", async () => {
    render(<RouterProvider router={router} />);
    const welcome = screen.getByText("Welcome, Herbert!");
    expect(welcome).toBeInTheDocument();
  });
});
