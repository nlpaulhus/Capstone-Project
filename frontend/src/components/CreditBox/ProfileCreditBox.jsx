import Badge from "react-bootstrap/Badge";

const ProfileCreditBox = ({ credit, inNetwork }) => {
  function onClick(e) {}
  return (
    <a href={`http://imdb.com/title/${credit.id}`} target="_blank">
      <div className="profileCreditBox">
        <img
          id={credit.id}
          className="profileCreditImage"
          src={credit.image}
        ></img>
        <div className="overlay">{credit.title}</div>
      </div>
    </a>
  );
};

export default ProfileCreditBox;
