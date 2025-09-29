import Form from "react-bootstrap/Form";
import AllServicesList from "../../components/AllServicesList/AllServicesList";
import Button from "react-bootstrap/Button";

const SearchForm = ({
  allServices,
  formData,
  updateSearch,
  paymentTypeClick,
  filterClick,
  paymentType,
  searchAddress,
  searchRadius,
  searchRadiusClick,
  searchAddressChange,
  searchAddressSubmit,
}) => {
  return (
    <div>
      <Form onSubmit={searchAddressSubmit}>
        <Form.Label>Service:</Form.Label>
        <AllServicesList
          serviceNames={allServices}
          formData={formData}
          onChangeHandler={updateSearch}
        />

        <Form.Group className="mb-3" controlId="address">
          <Form.Label> Address (zip): </Form.Label>
          <Form.Control
            onChange={searchAddressChange}
            type="number"
            value={searchAddress}
          ></Form.Control>
          <Button type="submit">Update</Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="searchRadius">
          <Form.Label>Search Within:</Form.Label>
          <Form.Check
            label="5 miles"
            id="5"
            checked={searchRadius === "5"}
            disabled={searchRadius === "5"}
            onChange={searchRadiusClick}
          ></Form.Check>
          <Form.Check
            label="15 miles"
            id="15"
            checked={searchRadius === "15"}
            disabled={searchRadius === "15"}
            onChange={searchRadiusClick}
          ></Form.Check>
          <Form.Check
            label="25 miles"
            id="25"
            checked={searchRadius === "25"}
            disabled={searchRadius === "25"}
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
    </div>
  );
};

export default SearchForm;
