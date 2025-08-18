import { useLoaderData } from "react-router-dom";
import axios from "axios";

export const NetworkPage = () => {
  const credits = useLoaderData();
  console.log(credits[0]);
  return (
    <div>
      {credits.map((credit) => (
        <div>
          <h1>{credit.title}</h1>
          <img src={credit.image}></img>
        </div>
      ))}
    </div>
  );
};

export async function networkLoader({ params }) {
  const imdbname = params.imdbname;

  try {
    let credits = await axios
      .get(`https://api.imdbapi.dev/names/${imdbname}/filmography`)
      .then((credits) => credits.data.credits);

    const filteredCredits = credits.map((credit) => {
      return {
        title: credit.title.primaryTitle,
        image: credit.title.primaryImage.url,
      };
    });

    return filteredCredits;
  } catch (error) {
    return error;
  }
}
