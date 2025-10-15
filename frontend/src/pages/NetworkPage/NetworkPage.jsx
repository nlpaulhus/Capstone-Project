import {
  useLoaderData,
  useNavigate,
  useLocation,
  redirect,
} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CreditBox from "../../components/CreditBox/CreditBox";
import NetworkBox from "../../components/NetworkBox/NetworkBox";
import "./NetworkPage.css";
import Button from "react-bootstrap/Button";
import { getLoggedInUser } from "../../helpers/helperFunctions";

const API_URL = import.meta.env.VITE_API_URL;

export const NetworkPage = () => {
  const { allCredits, networkCredits } = useLoaderData();
  const [nextpage, SetNextpage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const referrer = document.referrer;
    console.log(referrer);

    if (referrer.includes("signup") || referrer.includes("login")) {
      SetNextpage("/yourServices");
    } else {
      SetNextpage("/");
    }
  }, []);

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
    try {
      console.log(network);
      let result = await axios
        .post(
          `${API_URL}/network`,
          { newCredits: network },
         
        )
        .then((result) => {
          navigate(nextpage);
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
          <a href="mailto:contactagrip@gmail.com">contactagrip@gmail.com</a>
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
    //get user from jwt token on backend
    const user = await getLoggedInUser();

    if (user.imdbname) {
      const imdbname = user.imdbname;

      //get user's imdb credits from their imdbname
      let allCredits = await axios.get(
        `https://api.imdbapi.dev/names/${imdbname}/filmography`
      );

      allCredits = allCredits.data.credits;

      //filter down to only the data needed
      const editedallCredits = allCredits.map((credit) => {
        let titleImage = credit.title.primaryImage
          ? credit.title.primaryImage.url
          : "../../../../public/assets/notitleimage.png";

        return {
          id: credit.title.id,
          title: credit.title.primaryTitle,
          image: titleImage,
          startDate: credit.title.startYear,
          endDate: credit.title.endYear,
        };
      });

      //remove duplicates
      let filteredallCredits = [];

      const filtered = editedallCredits.filter(
        (allCredits, index, self) =>
          index ===
          self.findIndex((credit) => credit.title === allCredits.title)
      );

      if (filtered) {
        filteredallCredits = filtered;
      }

      //obtain array of the user's current network based on jwt on backend
      let currentNetworkImdbIds = await axios
        .get(`${API_URL}/network/user`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(
          (currentNetworkImdbIds) => currentNetworkImdbIds.data.networkArray
        );

      // loop over each imdbId and get the project's data and add to array

      let networkCreditsFiltered = [];

      for (let imdbId of currentNetworkImdbIds) {
        let titleData = await axios.get(
          `https://api.imdbapi.dev/titles/${imdbId}`
        );
        titleData = titleData.data;

        let titleImage = titleData.primaryImage
          ? titleData.primaryImage.url
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

        networkCreditsFiltered.push({
          id: titleData.id,
          title: titleData.primaryTitle,
          image: titleImage,
          startDate: titleData.startYear,
          endDate: titleData.endYear,
        });
      }

      return {
        allCredits: filteredallCredits,
        networkCredits: networkCreditsFiltered,
      };
    }
  } catch (err) {
    console.log(err);
    return redirect("/login/email");
  }
}
