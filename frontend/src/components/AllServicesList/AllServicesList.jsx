import Form from "react-bootstrap/Form";

const AllServicesList = ({ serviceNames, onChangeHandler, formData }) => {
  return (
    <Form.Group className="mb-3" controlId="serviceName">
      <Form.Select onChange={onChangeHandler} value={formData.serviceName}>
        <option key="x">Select A Service</option>
        {serviceNames.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default AllServicesList;
