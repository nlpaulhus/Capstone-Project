import Form from "react-bootstrap/Form";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

import { useSearchParams } from "react-router-dom";

const SearchForm = ({ allServices }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formData = {
    servicename: searchParams.get("search"),
  };

  function updateSearch(e) {
    const next = new URLSearchParams(searchParams);
    next.set("search", e.target.value);
    setSearchParams(next);
  }

  // Set or update a parameter – triggers navigation
  function updateParam(e) {
    // clone current params (important to preserve existing values)
    const next = new URLSearchParams(searchParams);
    next.set(e.target.id, e.target.value);
    setSearchParams(next);
  }

  // Remove a parameter
  function removeParam(e) {
    const next = new URLSearchParams(searchParams);
    next.delete(e.target.id);
    setSearchParams(next);
  }

  //add or remove filter
  function filterClick(e) {
    if (e.target.checked) {
      const next = new URLSearchParams(searchParams);
      next.set(e.target.id, true);
      setSearchParams(next);
    } else {
      const next = new URLSearchParams(searchParams);
      next.delete(e.target.id);
      setSearchParams(next);
    }
  }

  return (
    <Form>
      <Form.Label>Service:</Form.Label>
      <AllServicesList
        serviceNames={allServices}
        formData={formData}
        onChangeHandler={updateSearch}
      />

      <Form.Group className="mb-3" controlId="sort">
        <Form.Label>Sort By:</Form.Label>
        <Form.Select onChange={updateParam} defaultValue={"rating"}>
          <option value={"rating"}>Rating</option>
          <option value={"price"}>Price</option>
        </Form.Select>
      </Form.Group>

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
