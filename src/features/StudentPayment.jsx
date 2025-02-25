import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function StudentPayment() {
  const studentSchema = Yup.object().shape({
    StudentName: Yup.string().required("Student Name is required"),
    PhoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    Email: Yup.string().email("Invalid email format").required("Email is required"),
    Gender: Yup.string().oneOf(["Male", "Female"], "Invalid Gender").required("Gender is required"),
    PaymentScreenshot: Yup.mixed().required("Payment Screenshot is required"),
    Course: Yup.string().oneOf(["React", "MERN", "MEAN", "Java", "Angular", "Vite"], "Invalid Course").required("Course is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Student Payment</h1>
      <Formik
        initialValues={{
          StudentName: '',
          PhoneNumber: '',
          Email: '',
          Gender: '',
          PaymentScreenshot: null,
          Course: '',
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" className="upload-form">
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
                <Field type="radio" name="Gender" value="Male" />
                Male
              </label>
              <label>
                <Field type="radio" name="Gender" value="Female" />
                Female
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
              <label>
                <Field type="radio" name="Course" value="React" />
                React
              </label>
              <label>
                <Field type="radio" name="Course" value="MERN" />
                MERN
              </label>
              <label>
                <Field type="radio" name="Course" value="MEAN" />
                MEAN
              </label>
              <label>
                <Field type="radio" name="Course" value="Java" />
                Java
              </label>
              <label>
                <Field type="radio" name="Course" value="Angular" />
                Angular
              </label>
              <label>
                <Field type="radio" name="Course" value="Vite" />
                Vite
              </label>
              <ErrorMessage name="Course" component="div" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentPayment;
