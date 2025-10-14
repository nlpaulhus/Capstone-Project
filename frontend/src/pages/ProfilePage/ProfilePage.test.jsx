import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfilePage } from "./ProfilePage.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const loaderData = {
  profile: {
    city: "Los Angeles",
    email: "kris@yay.com",
    firstname: "Herbert",
    lastname: "J",
    geom: "0101000020E6100000774B72C0AE0E414021E868554B8C5DC0",
    imdbname: "nm4218082",
    lat: 34.114708,
    lng: -118.192098,
    profilephoto: "https://avatars.githubusercontent.com/u/18086342",
    userid: "7dd800f9-6db9-4611-9e32-1fa92ac61cde",
    zip: "90042",
  },
  listings: [
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
    {
      id: "2b67199c-1ca7-4101-b551-9aedbd649b5f",
      userid: "901f959f-7f9e-461d-ae57-a5780323e313",
      servicename: "Proofreading",
      description: "Experienced proofreader! ",
      price: 20,
      paymenttype: "hourly",
    },
    {
      id: "62b731e9-3aa6-4c9a-b472-1e985fb7dc50",
      userid: "901f959f-7f9e-461d-ae57-a5780323e313",
      servicename: "Dog Walking",
      description: "I will walk your dog! Experienced!",
      price: 30,
      paymenttype: "hourly",
    },
    {
      id: "ed9ba7f9-e859-466a-add8-00c9b211d6a9",
      userid: "901f959f-7f9e-461d-ae57-a5780323e313",
      servicename: "Commissioned Art",
      description: "I can cross stitch, crochet and macrame!",
      price: 10,
      paymenttype: "hourly",
    },
  ],
  listerNetwork: [
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

const routes = [
  {
    path: "/profile/:listingId",
    loader: () => loaderData,
    element: <ProfilePage />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/profile/5495f1cd-5e90-4c05-bbec-a0338308b16b"],
});

describe("Dashboard", () => {
  it("renders the dashboard page", async () => {
    render(<RouterProvider router={router} />);
    const name = screen.getByText("Herbert J.");
    const childcare = screen.getByText("Childcare");
  });
});
