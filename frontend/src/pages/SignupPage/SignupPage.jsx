import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./SignupPage.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";

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
});

function SignupPage() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  setIsLoggedIn(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values) => {
    const { firstName, lastName, email, password, IMDBLink } = values;
    const IMDBFirstSplit = IMDBLink.split("name/", 2);
    const IMDBName = IMDBFirstSplit[1].split("/?ref", 1);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      IMDBName: IMDBName[0],
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
      setIsLoggedIn(true);
      navigate(`/yournetwork`);
    }
  };

  return (
    <div id="signupPage">
      <div>
        <h1>Signup</h1>
      </div>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            IMDBLink: "",
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
              {errors.email && touched.email ? (
                <span>{errors.email}</span>
              ) : null}
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
              <input id="file" type="file" onChange={handleFileChange} />

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <span>{serverError}</span>
    </div>
  );
}

export default SignupPage;
