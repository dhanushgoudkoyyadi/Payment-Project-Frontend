import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate();
  const adminSchema = Yup.object().shape({
    AdminName: Yup.string().required("Required ..."),
    PassWord: Yup.string().required("Required ..."),
  });

  const handleSubmit = (values) => {
    const { AdminName, PassWord } = values;
    if (AdminName === "dhanush" && PassWord === "Edupoly") {
      navigate("/Adminboard");
    } else {
      alert("Invalid AdminName or Password");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          AdminName: '',
          PassWord: '',
        }}
        validationSchema={adminSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" name="AdminName" placeholder="Admin Name" />
          <ErrorMessage name="AdminName" component="div" />
          <Field type="password" name="PassWord" placeholder="PassWord" />
          <ErrorMessage name="PassWord" component="div" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Admin;
