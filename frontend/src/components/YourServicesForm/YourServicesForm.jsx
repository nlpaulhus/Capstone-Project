import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

const YourServicesForm = ({
  allServices,
  formData,
  onChangeHandler,
  onSubmit,
}) => {
  return (
    <Form>
      <AllServicesList
        serviceNames={allServices}
        formData={formData}
        onChangeHandler={onChangeHandler}
      />
      <Form.Group
        className="mb-3"
        controlId="description"
        onChange={onChangeHandler}
      >
        <Form.Label>Add a Personalized Description of Your Service</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          required
          value={formData.description}
          onChange={onChangeHandler}
        ></Form.Control>
      </Form.Group>

      <Form.Label>Your Price</Form.Label>
      <InputGroup className="mb-3" onChange={onChangeHandler}>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          aria-label="Amount (to the nearest dollar)"
          type="number"
          step="1"
          id="price"
          min="0"
          value={formData.price}
          onChange={onChangeHandler}
        />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <div className="mb-3">
        <Form.Check
          inline
          label="Hourly"
          name="group1"
          id="hourly"
          checked={formData.paymentType.includes("hourly")}
          onChange={onChangeHandler}
        />
        <Form.Check
          inline
          label="Per Project"
          name="group1"
          id="perProject"
          checked={formData.paymentType.includes("perProject")}
          onChange={onChangeHandler}
        />
      </div>
      <Button onClick={onSubmit}>ADD</Button>
    </Form>
  );
};

export default YourServicesForm;
