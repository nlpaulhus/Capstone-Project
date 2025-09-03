import axios from "axios";
import { useLoaderData } from "react-router-dom";
import ListingBox from "../../components/ListingBox/ListingBox";

export const SearchPage = () => {
  const { servicename, listings } = useLoaderData();
  console.log(listings);

  return (
    <div>
      <h1>{servicename}</h1>
      <ul>
        {listings.map((listing) => (
          <ListingBox key={listing.id} listing={listing} />
        ))}
      </ul>
    </div>
  );
};

export async function searchPageLoader({ params }) {
  const servicename = params.servicename;
  const user = await axios.get("http://localhost:3000/user", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  const userId = user.data.userid;
  const listings = await axios.get(
    `http://localhost:3000/search/${servicename}/${userId}`
  );
  return { servicename: servicename, listings: listings.data.listings };
}
