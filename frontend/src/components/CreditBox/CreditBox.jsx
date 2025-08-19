import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CreditBox = ({ credit, addOrRemove, buttonHandler }) => {
  let buttonText;
  let cardClass;
  let cardStyle;
  let cardBodyClass;
  let cardTitle;

  if (addOrRemove === "add") {
    buttonText = "Add To Network";
    cardClass = "text-center";
    cardStyle = { width: "19vw", marginBottom: "20px" };
  } else if (addOrRemove === "remove") {
    buttonText = "Remove";
    cardStyle = { width: "25rem", margin: "10px" };
    cardBodyClass = "d-flex justify-content-between align-items-center";
  }

  if (credit.endDate) {
    cardTitle = `${credit.title} (${credit.startDate}-${credit.endDate})`;
  } else {
    cardTitle = `${credit.title} (${credit.startDate})`;
  }

  return (
    <div>
      <Card className={cardClass} style={cardStyle}>
        {addOrRemove === "add" && <Card.Img src={credit.image}></Card.Img>}
        <Card.Body className={cardBodyClass}>
          <Card.Title> {cardTitle}</Card.Title>
          <Button id={credit.id} onClick={buttonHandler}>
            {buttonText}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreditBox;
