import Form from "react-bootstrap/Form";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

const SearchForm = ({
  allServices,
  formData,
  updateSearch,
  paymentTypeClick,
  filterClick,
  paymentType,
  userzip,
  searchRadius,
  searchRadiusClick,
}) => {
  return (
    <Form>
      <Form.Label>Service:</Form.Label>
      <AllServicesList
        serviceNames={allServices}
        formData={formData}
        onChangeHandler={updateSearch}
      />

      <Form.Group className="mb-3" controlId="address">
        <Form.Label> Address: </Form.Label>
        <Form.Control type="text" defaultValue={userzip}></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="searchRadius">
        <Form.Label>Search Within:</Form.Label>
        <Form.Check
          label="10 miles"
          id="10"
          checked={searchRadius === "10"}
          disabled={searchRadius === "10"}
          onChange={searchRadiusClick}
        ></Form.Check>
        <Form.Check
          label="20 miles"
          id="20"
          checked={searchRadius === "20"}
          disabled={searchRadius === "20"}
          onChange={searchRadiusClick}
        ></Form.Check>
        <Form.Check
          label="30 miles"
          id="30"
          checked={searchRadius === "30"}
          disabled={searchRadius === "30"}
          onChange={searchRadiusClick}
        ></Form.Check>
        <Form.Check
          label="Show all results"
          id="none"
          checked={searchRadius === "none"}
          disabled={searchRadius === "none"}
          onChange={searchRadiusClick}
        ></Form.Check>
        <Form.Check
          label="Suggested distance"
          id="suggested"
          checked={searchRadius === "suggested"}
          disabled={searchRadius === "suggested"}
          onChange={searchRadiusClick}
        ></Form.Check>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="sort">
        <Form.Label>Sort By:</Form.Label>
        <Form.Select defaultValue={"rating"}>
          <option value={"rating"}>Rating</option>
          <option value={"price"}>Price</option>
          <option value={"distance"}>Distance</option>
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
