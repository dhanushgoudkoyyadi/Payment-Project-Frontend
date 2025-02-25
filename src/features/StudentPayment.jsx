import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddMutation } from "../service/Leads";
import { jwtDecode } from "jwt-decode"; // Correct import

function StudentPayment() {
  const studentSchema = Yup.object().shape({
    StudentName: Yup.string().required("Student Name is required"),
    PhoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    Email: Yup.string().email("Invalid email format").required("Email is required"),
    Gender: Yup.string().oneOf(["Male", "Female"], "Invalid Gender").required("Gender is required"),
    PaymentScreenshot: Yup.mixed().required("Payment Screenshot is required"),
    Course: Yup.string()
      .oneOf(["React", "MERN", "MEAN", "Java", "Angular", "Vite"], "Invalid Course")
      .required("Course is required"),
  });

  const [addStudent] = useAddMutation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("StudentName", values.StudentName);
      formData.append("PhoneNumber", values.PhoneNumber);
      formData.append("Email", values.Email);
      formData.append("Gender", values.Gender);
      formData.append("PaymentScreenshot", values.PaymentScreenshot);
      formData.append("Course", values.Course);

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      // Validate token format before decoding
      if (token.split(".").length !== 3) {
        alert("Invalid token format. Please log in again.");
        return;
      }

      // Decode token to get user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id;

      formData.append("userId", userId);

      await addStudent({ formData, userId }).unwrap();
      alert("Form uploaded successfully");

      resetForm();
      document.getElementById("file").value = "";
    } catch (error) {
      console.error("Failed to upload data:", error);
      alert("Failed to upload data. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Student Payment</h1>
      <Formik
        initialValues={{
          StudentName: "",
          PhoneNumber: "",
          Email: "",
          Gender: "",
          PaymentScreenshot: null,
          Course: "",
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form encType="multipart/form-data" className="upload-form">
            <div>
              <Field type="text" name="StudentName" placeholder="Student Name" />
              <ErrorMessage name="StudentName" component="div" />
            </div>

            <div>
              <Field type="text" name="PhoneNumber" placeholder="Phone Number" />
              <ErrorMessage name="PhoneNumber" component="div" />
            </div>

            <div>
              <Field type="email" name="Email" placeholder="Email" />
              <ErrorMessage name="Email" component="div" />
            </div>

            <div>
              <label>
                <Field type="radio" name="Gender" value="Male" /> Male
              </label>
              <label>
                <Field type="radio" name="Gender" value="Female" /> Female
              </label>
              <ErrorMessage name="Gender" component="div" />
            </div>

            <div>
              <input
                id="file"
                name="PaymentScreenshot"
                type="file"
                onChange={(event) => {
                  setFieldValue("PaymentScreenshot", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="PaymentScreenshot" component="div" />
            </div>

            <div>
              {["React", "MERN", "MEAN", "Java", "Angular", "Vite"].map((course) => (
                <label key={course}>
                  <Field type="radio" name="Course" value={course} /> {course}
                </label>
              ))}
              <ErrorMessage name="Course" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentPayment;
