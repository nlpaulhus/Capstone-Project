import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const ProfileCreditBox = ({ credit }) => {
  return (
    <a href={`http://imdb.com/title/${credit.id}`} target="_blank">
      <div className="profileCreditBox">
        <img className="profileCreditImage" src={credit.image} />
        <div className="overlay">{credit.title}</div>
      </div>
    </a>
  );
};

export default ProfileCreditBox;
