import Card from "react-bootstrap/Card";

const ProfileCreditBox = ({ credit }) => {
  return (
    <div>
      <Card>
        <Card.Img src={credit.image}></Card.Img>
        <Card.Body>
          <Card.Title>
            {" "}
            <a href={`http://imdb.com/title/${credit.id}`} target="_blank">
              {credit.title}
            </a>
          </Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCreditBox;
