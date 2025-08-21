import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ServiceBox = ({ service, buttonHandler }) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text> {service.servicename}</Card.Text>
          <Button variant="link" onClick={buttonHandler}>
            Edit
          </Button>
          <Button variant="link" onClick={buttonHandler}>
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServiceBox;
