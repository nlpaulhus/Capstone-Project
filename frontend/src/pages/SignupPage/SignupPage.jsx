import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./SignupPage.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain eight characters, one uppercase, one lowercase, one number and one special character"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  IMDBLink: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
});

function SignupPage() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values) => {
    const {
      firstName,
      lastName,
      email,
      password,
      IMDBLink,
      street,
      city,
      state,
      zip,
    } = values;
    const IMDBFirstSplit = IMDBLink.split("name/", 2);
    const IMDBName = IMDBFirstSplit[1].split("/", 1);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      IMDBName: IMDBName[0],
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
        "http://localhost:3000/signup",
        newUser,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        let responseMessage = error.response.data;
        if (
          responseMessage.includes("email") &&
          responseMessage.includes("already exists")
        ) {
          setServerError(
            "An account is already registered with that email address"
          );
        } else if (
          responseMessage.includes("imdbname") &&
          responseMessage.includes("already exists")
        ) {
          setServerError(
            "An account is already registered with that IMDB Page"
          );
        } else {
          console.log(error);
        }
      }
    } finally {
      localStorage.setItem("loggedIn", true);
      navigate(`/yournetwork`);
    }
  };

  return (
    <Stack className="col-md-5 mx-auto" id="signupPage" gap={3}>
      <h1 style={{textAlign: "center"}}>Signup</h1>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          IMDBLink: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        }}
        validationSchema={SignupSchema}
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
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <span>{errors.email}</span> : null}
            <label htmlFor="password">Password:</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <span>{errors.password}</span>
            ) : null}
            <label htmlFor="confirmPassword">Re-Enter Password:</label>
            <Field name="confirmPassword" type="password" />
            {errors.confirmPassword && touched.confirmPassword ? (
              <span>{errors.confirmPassword}</span>
            ) : null}
            <label htmlFor="IMDBLink">Link to Your IMDB Page:</label>
            <Field name="IMDBLink" />
            {errors.IMDBLink && touched.IMDBLink ? (
              <span>{errors.IMDBLink}</span>
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
              <Button type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      <span>{serverError}</span>
    </Stack>
  );
}

export default SignupPage;
