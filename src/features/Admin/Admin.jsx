import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Import the CSS file

function Admin() {
  const navigate = useNavigate();

  const adminSchema = Yup.object().shape({
    AdminName: Yup.string().required("Admin Name is required"),
    PassWord: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { AdminName, PassWord } = values;
    
    if (AdminName === "dhanush" && PassWord === "Edupoly") {
      navigate("/Adminboard");
    } else {
      alert("Invalid Admin Name or Password");
    }
    
    setSubmitting(false);
  };

  return (
    <div className="admin-container">
      <Formik
        initialValues={{ AdminName: "", PassWord: "" }}
        validationSchema={adminSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="formik-form">
            <h2>Admin Login</h2>

            <div className="form-group">
              <label htmlFor="AdminName">Admin Name</label>
              <Field type="text" name="AdminName" className="form-control" placeholder="Enter Admin Name" />
              <ErrorMessage name="AdminName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="PassWord">Password</label>
              <Field type="password" name="PassWord" className="form-control" placeholder="Enter Password" />
              <ErrorMessage name="PassWord" component="div" className="error-message" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Admin;
