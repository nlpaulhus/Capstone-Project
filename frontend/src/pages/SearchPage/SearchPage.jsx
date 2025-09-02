import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const SearchPage = () => {
  const listings = useLoaderData;

  return <h1>{listings}</h1>;
};

export async function searchPageLoader({ params }) {
  const servicename = params.servicename;

  const user =  await axios.get("http://localhost:3000/user", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const userId = user.data.userid;

  const listings = await axios.get(
    `http://localhost:3000/search/${servicename}/${userId}`
  );

  return listings.data;
}
