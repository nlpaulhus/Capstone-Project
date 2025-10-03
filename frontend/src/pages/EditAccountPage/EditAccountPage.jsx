import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const EditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  street: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
});

export function EditAccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const { currentUserData } = useLoaderData();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values) => {
    const { firstName, lastName, street, city, state, zip } = values;
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      street: street,
      city: city,
      state: state,
      zip: zip,
    };

    const data = new FormData();
    data.set("sample_file", file);

    try {
      if (file) {
        const res = await axios.post("http://localhost:3000/api/upload", data);
        newUser.profilePhoto = res.data.imageUrl;
      }

      const resultTwo = await axios.post(
        "http://localhost:3000/user/edit",
        newUser,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.setItem("loggedIn", true);
      navigate(`/`);
    }
  };

  return (
    <Stack className="col-md-5 mx-auto" id="signupPage" gap={3}>
      <h1 style={{ textAlign: "center" }}>Edit Account Info</h1>

      <Formik
        initialValues={{
          firstName: currentUserData.firstname,
          lastName: currentUserData.lastname,
          street: currentUserData.street,
          city: currentUserData.city,
          state: currentUserData.state,
          zip: currentUserData.zip,
        }}
        validationSchema={EditSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="firstName">First Name:</label>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <span>{errors.firstName}</span>
            ) : null}
            <label htmlFor="lastName">Last Name:</label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <span>{errors.lastName}</span>
            ) : null}

            <label htmlFor="street">Address (street):</label>
            <Field name="street" />
            {errors.street && touched.street ? (
              <span>{errors.street}</span>
            ) : null}

            <Row>
              <Col>
                <label htmlFor="city">City:</label>
                <Field name="city" />
                {errors.city && touched.city ? (
                  <span>{errors.city}</span>
                ) : null}
              </Col>
              <Col>
                <label htmlFor="state">State:</label>
                <Field name="state" as="select">
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Field>

                {errors.state && touched.state ? (
                  <span>{errors.state}</span>
                ) : null}
              </Col>
              <Col>
                <label htmlFor="zip">Zip Code:</label>
                <Field name="zip" />
                {errors.zip && touched.zip ? <span>{errors.zip}</span> : null}
              </Col>
            </Row>

            <Row>
              <label htmlFor="file">Upload a profile picture (optional):</label>
              <input
                name="file"
                id="file"
                type="file"
                onChange={handleFileChange}
              />
            </Row>
            <Stack className="col-md-5 mx-auto" id="signupButton">
              <Button type="submit">Submit</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

export async function EditAccountLoader() {
  try {
    const currentUserData = await axios
      .get("http://localhost:3000/user/edit", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((currentUserData) => currentUserData.data);

    return { currentUserData };
  } catch (error) {
    console.log(error);
  }
}
