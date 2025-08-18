import Card from "react-bootstrap/Card";
import CreditBox from "../CreditBox/CreditBox";

const NetworkBox = ({ network, buttonHandler }) => {
  return (
    <Card className="text-center" style={{ padding: "2rem", width: "30rem" }}>
      <Card.Title>Your Network</Card.Title>
      <Card.Body>
        {network.map((project) => (
          <CreditBox
            key={project.id}
            credit={project}
            addOrRemove="remove"
            buttonHandler={buttonHandler}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default NetworkBox;
