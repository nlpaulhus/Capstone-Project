import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NetworkPage } from "./NetworkPage.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const loaderData = {
  allCredits: [
    {
      id: "tt2262532",
      title: "The Fosters",
      image:
        "https://m.media-amazon.com/images/M/MV5BMWMzZmRlMDUtOWQ3YS00ODA4LWJlMzUtMjY0MWFhZDBkOTlkXkEyXkFqcGc@._V1_.jpg",
      startDate: 2013,
      endDate: 2018,
    },
    {
      id: "tt7820906",
      title: "Good Trouble",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2YzNTgzOTktZWU4Ny00YTc3LWE4ZWYtZGI4NTBhODk3ZDhlXkEyXkFqcGc@._V1_.jpg",
      startDate: 2019,
      endDate: 2024,
    },
    {
      id: "tt4219868",
      title: "Not That Kind of Girl",
      image:
        "https://m.media-amazon.com/images/M/MV5BMmU1YjRlYTAtMGViOC00ZDcxLTg1NjYtZGNjNzg3MWU4YWFjXkEyXkFqcGc@._V1_.jpg",
      startDate: 2015,
    },
    {
      id: "tt5606038",
      title: "Highs & Lows",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQ3Mjg3NTQ0MV5BMl5BanBnXkFtZTgwMDI0ODE3OTE@._V1_.jpg",
      startDate: 2016,
    },
    {
      id: "tt5606084",
      title: "Sex Ed",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2RjOWRjYmYtYmI3NS00ODVkLTkyMDItNGVlOTA1MTZjZjExXkEyXkFqcGc@._V1_.jpg",
      startDate: 2017,
    },
    {
      id: "tt5606072",
      title: "Cruel and Unusual",
      image:
        "https://m.media-amazon.com/images/M/MV5BYjE4NTI4MmUtNTBjNS00ZTAwLWE4MmQtMDE5Y2E1N2NhYWY1XkEyXkFqcGc@._V1_.jpg",
      startDate: 2017,
    },
    {
      id: "tt6489142",
      title: "Telling",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTdjMmIxNzUtNTlmZS00ODE2LTkyYjEtZGNlNWJlYWYyNjE3XkEyXkFqcGc@._V1_.jpg",
      startDate: 2017,
    },
    {
      id: "tt6489166",
      title: "Scars",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzE3NDI3NWEtYmE3Zi00ZTdmLWIwMTUtYTUzMWQ4ZTZmZjEwXkEyXkFqcGc@._V1_.jpg",
      startDate: 2018,
    },
    {
      id: "tt4529498",
      title: "Last Word",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTU0Njk2NTMzOV5BMl5BanBnXkFtZTgwMjMzNjg5NDE@._V1_.jpg",
      startDate: 2015,
    },
  ],
  networkCredits: [
    {
      id: "tt2262532",
      title: "The Fosters",
      image:
        "https://m.media-amazon.com/images/M/MV5BMWMzZmRlMDUtOWQ3YS00ODA4LWJlMzUtMjY0MWFhZDBkOTlkXkEyXkFqcGc@._V1_.jpg",
      startDate: 2013,
      endDate: 2018,
    },
    {
      id: "tt7820906",
      title: "Good Trouble",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2YzNTgzOTktZWU4Ny00YTc3LWE4ZWYtZGI4NTBhODk3ZDhlXkEyXkFqcGc@._V1_.jpg",
      startDate: 2019,
      endDate: 2024,
    },
  ],
};

const router = createMemoryRouter([
  {
    id: "main", // Important: Match the ID of the route where your component is rendered
    path: "/",
    element: <NetworkPage />,
    loader: async () => loaderData,
  },
]);

describe("Dashboard", () => {
  it("renders the dashboard page", async () => {
    render(<RouterProvider router={router} />);
    const availableCredit = screen.getByText("Sex Ed (2017)");
    const addedCredit = screen.getByText("The Fosters (2013-2018)");
  });
});
