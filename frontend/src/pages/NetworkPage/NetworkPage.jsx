import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import CreditBox from "../../components/CreditBox/CreditBox";
import NetworkBox from "../../components/NetworkBox/NetworkBox";
import "./NetworkPage.css";
import Button from "react-bootstrap/Button";

export const NetworkPage = () => {
  const navigate = useNavigate();
  const { allCredits, networkCredits, userId } = useLoaderData();

  let networkCreditIds = networkCredits.map((credit) => credit.id);

  const allCreditsFiltered = allCredits.filter((credit) => {
    return !networkCreditIds.includes(credit.id);
  });

  const [network, setNetwork] = useState(networkCredits);
  const [creditOptions, setCreditOptions] = useState(allCreditsFiltered);

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
    const addedOption = allCredits.filter((credit) => credit.id === creditId);
    const newCreditOptions = [...creditOptions, addedOption[0]];
    setCreditOptions(newCreditOptions);
  };

  const nextButtonHandler = async () => {
    const newCredits = network.filter(
      (credit) => !networkCreditIds.includes(credit.id)
    );

    try {
      let result = await axios
        .post(
          "http://localhost:3000/imdbnetwork",
          { userId, newCredits },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((result) => {
          navigate(`/yourservices/`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="networkPage">
      <div id="networkPageInstructions">
        <p>
          Select the projects from your IMDB Page that you'd like added to your
          network.<br></br>If there's a project missing from your IMDB page that
          you'd like to add to your network, please contact{" "}
          <a href="temp">temp@gmail.com</a>
        </p>
      </div>
      <div id="networkPageCards">
        <div id="allCredits" className="overflow-auto">
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
          <div className="d-flex">
            <Button onClick={nextButtonHandler} className="ms-auto">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function networkLoader() {
  try {
    const user = await axios.get("http://localhost:3000/user", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const imdbname = user.data.imdbname;
    const userId = user.data.userid;

    let allCredits = await axios
      .get(`https://api.imdbapi.dev/names/${imdbname}/filmography`)
      .then((allCredits) => allCredits.data.credits);

    const editedallCredits = allCredits.map((credit) => {
      return {
        id: credit.title.id,
        title: credit.title.primaryTitle,
        image: credit.title.primaryImage.url,
        startDate: credit.title.startYear,
        endDate: credit.title.endYear,
      };
    });

    const filteredallCredits = editedallCredits.filter(
      (allCredits, index, self) =>
        index === self.findIndex((credit) => credit.title === allCredits.title)
    );

    const currentNetworkImdbIds = await axios
      .get("http://localhost:3000/user/network", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((currentNetworkImdbIds) => currentNetworkImdbIds.data.networkArray);

    let allCreditsFiltered;

    if (currentNetworkImdbIds.length > 0) {
      let titleIds = ":batchGet?";

      currentNetworkImdbIds.map((id) => (titleIds += `titleIds=${id}&`));

      if (titleIds.charAt(titleIds.length - 1) == "&") {
        titleIds = titleIds.substr(0, titleIds.length - 1);
      }

      let allNetworkCredits = await axios
        .get(`https://api.imdbapi.dev/titles${titleIds}`)
        .then((allNetworkCredits) => allNetworkCredits.data.titles);

      allCreditsFiltered = allNetworkCredits.map((credit) => {
        return {
          id: credit.id,
          title: credit.primaryTitle,
          image: credit.primaryImage.url,
          startDate: credit.startYear,
          endDate: credit.endYear,
        };
      });
    } else {
      allCreditsFiltered = [];
    }

    return {
      allCredits: filteredallCredits,
      networkCredits: allCreditsFiltered,
      userId: userId,
    };
  } catch (error) {
    return redirect("/login");
  }
}
