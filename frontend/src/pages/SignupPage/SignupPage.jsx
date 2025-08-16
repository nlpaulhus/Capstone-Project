import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./SignupPage.css";
import axios from "axios";
import { useState } from "react";

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
  password: Yup.string().required("Required").min(8, "Too Short!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  IMDBLink: Yup.string().required(),
});

const SignupPage = () => {
  const [serverError, setServerError] = useState("");

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
          onSubmit={(values) => {
            const { firstName, lastName, email, password, IMDBLink } = values;
            const IMDBFirstSplit = IMDBLink.split("name/", 2);
            const IMDBName = IMDBFirstSplit[1].split("/?ref", 1);
            const newUser = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              IMDBName: IMDBName,
            };

            let result = axios
              .post("http://localhost:3000/signup", newUser)
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
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
              });
          }}
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
              <Field name="password" />
              {errors.password && touched.password ? (
                <span>{errors.password}</span>
              ) : null}
              <label htmlFor="confirmPassword">Re-Enter Password:</label>
              <Field name="confirmPassword" />
              {errors.confirmPassword && touched.confirmPassword ? (
                <span>{errors.confirmPassword}</span>
              ) : null}
              <label htmlFor="IMDBLink">Link to Your IMDB Page:</label>
              <Field name="IMDBLink" />
              {errors.IMDBLink && touched.IMDBLink ? (
                <span>{errors.IMDBLink}</span>
              ) : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <span>{serverError}</span>
    </div>
  );
};

export default SignupPage;
