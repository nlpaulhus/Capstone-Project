import Form from "react-bootstrap/Form";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

const SearchForm = ({
  allServices,
  formData,
  updateSearch,
  paymentTypeClick,
  filterClick,
  paymentType,
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
        <Form.Label>Filter:</Form.Label>
        <Form.Check
          label="In My Network"
          id="innetwork"
          onChange={filterClick}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="filters">
        <Form.Label>Payment Type:</Form.Label>
        <Form.Check
          label="Hourly"
          id="hourly"
          onChange={paymentTypeClick}
          checked={paymentType === "hourly"}
          disabled={paymentType === "hourly"}
        />
        <Form.Check
          label="Flat Rate.    "
          id="flatrate"
          onChange={paymentTypeClick}
          checked={paymentType === "flatrate"}
          disabled={paymentType === "flatrate"}
        />
        <Form.Check
          label="All"
          id="all"
          onChange={paymentTypeClick}
          checked={paymentType === "all"}
          disabled={paymentType === "all"}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
