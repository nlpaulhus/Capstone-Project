import Form from "react-bootstrap/Form";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

const SearchForm = ({
  allServices,
  formData,
  updateSearch,
  updateParam,
  filterClick,
}) => {
  return (
    <Form>
      <Form.Label>Service:</Form.Label>
      <AllServicesList
        serviceNames={allServices}
        formData={formData}
        onChangeHandler={updateSearch}
      />

      {/* <Form.Group className="mb-3" controlId="sort">
        <Form.Label>Sort By:</Form.Label>
        <Form.Select onChange={updateParam} defaultValue={"rating"}>
          <option value={"rating"}>Rating</option>
          <option value={"price"}>Price</option>
        </Form.Select>
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="filters">
        <Form.Label>Filters</Form.Label>
        <Form.Check
          label="In My Network"
          id="innetwork"
          onChange={filterClick}
        />
        <Form.Check label="Hourly" id="hourly" onChange={filterClick} />
        <Form.Check label="Flat Rate" id="flatrate" onChange={filterClick} />
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
