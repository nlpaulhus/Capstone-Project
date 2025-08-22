import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ServiceBox = ({ service, removeButtonHandler }) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> {service.servicename}</Card.Title>
          <Card.Text>
            ${service.price}/{service.paymentType}
          </Card.Text>
          <Button id={service.id} variant="link" onClick={removeButtonHandler}>
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServiceBox;
