import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import CreditBox from "../../components/CreditBox/CreditBox";
import NetworkBox from "../../components/NetworkBox/NetworkBox";
import "./NetworkPage.css";

export const NetworkPage = () => {
  const credits = useLoaderData();
  const [network, setNetwork] = useState([]);
  const [creditOptions, setCreditOptions] = useState(credits);

  const addToNetworkHandler = (e) => {
    const creditId = e.target.id;
    const creditData = creditOptions.filter((credit) => credit.id === creditId);
    const newNetwork = [...network, creditData[0]];
    const newCreditOptions = creditOptions.filter(
      (credit) => credit.id !== creditId
    );
    setNetwork(newNetwork);
    setCreditOptions(newCreditOptions);
  };

  const removeFromNetworkHandler = (e) => {
    const creditId = e.target.id;
    const newNetwork = network.filter((credit) => credit.id !== creditId);
    setNetwork(newNetwork);
    const addedOption = credits.filter((credit) => credit.id === creditId);
    const newCreditOptions = [...creditOptions, addedOption[0]];
    setCreditOptions(newCreditOptions);
  };

  return (
    <div id="networkPage">
      <div id="networkPageInstructions">
        <p>
          Select the projects from your IMDB Page that you'd like added to your
          network.
        </p>
      </div>
      <div id="networkPageCards">
        <div id="credits" className="overflow-auto">
          {creditOptions.map((credit) => (
            <CreditBox
              key={credit.id}
              credit={credit}
              addOrRemove="add"
              buttonHandler={addToNetworkHandler}
            />
          ))}
        </div>
        <div id="network">
          <NetworkBox
            network={network}
            buttonHandler={removeFromNetworkHandler}
          />
        </div>
      </div>
    </div>
  );
};

export async function networkLoader({ params }) {
  const imdbname = params.imdbname;

  try {
    let credits = await axios
      .get(`https://api.imdbapi.dev/names/${imdbname}/filmography`)
      .then((credits) => credits.data.credits);

    const editedCredits = credits.map((credit) => {
      return {
        id: credit.title.id,
        title: credit.title.primaryTitle,
        image: credit.title.primaryImage.url,
        startDate: credit.title.startYear,
        endDate: credit.title.endYear,
      };
    });

    const filteredCredits = editedCredits.filter(
      (credits, index, self) =>
        index === self.findIndex((credit) => credit.title === credits.title)
    );

    return filteredCredits;
  } catch (error) {
    return error;
  }
}
