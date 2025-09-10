import { useLoaderData } from "react-router-dom";
import axios from "axios";

export const ProfilePage = () => {
  const currentUser = useLoaderData();
  console.log(currentUser);

  return <h1>Profile</h1>;
};

export async function profilePageLoader({ params }) {
  const listingId = params.listingId;

  try {
    const currentUser = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((currentUser) => currentUser.data);

    return { currentUser };
  } catch (err) {
    console.log(err);
  }
}
