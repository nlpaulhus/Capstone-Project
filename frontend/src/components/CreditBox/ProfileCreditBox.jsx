import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const ProfileCreditBox = ({ credit }) => {
  return (
    <div>
      <Card>
        <Image src={credit.image} thumbnail></Image>
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
