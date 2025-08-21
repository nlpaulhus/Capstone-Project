import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ServiceBox = ({ service, removeButtonHandler }) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text> {service.servicename}</Card.Text>
          <Button variant="link">Edit</Button>
          <Button id={service.id} variant="link" onClick={removeButtonHandler}>
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServiceBox;
