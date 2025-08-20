import Form from "react-bootstrap/Form";

const AllServicesList = ({ serviceNames, onChangeHandler }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Select onChange={onChangeHandler}>
        <option>Select A Service</option>
        {serviceNames.map((service) => (
          <option key={service.index} value={service}>
            {service}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default AllServicesList;
