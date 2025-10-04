
import Badge from "react-bootstrap/Badge";

const ProfileCreditBox = ({ credit, inNetwork }) => {
  return (
    <div className="profileCreditBox">
      <img className="profileCreditImage" src={credit.image}></img>
    </div>
  );
};

export default ProfileCreditBox;
