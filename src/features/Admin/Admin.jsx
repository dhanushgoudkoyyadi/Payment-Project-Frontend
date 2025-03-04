import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import "./Admin.css" // Updated CSS file name

function Admin() {
  const navigate = useNavigate()

  const adminSchema = Yup.object().shape({
    AdminName: Yup.string().required("Admin Name is required"),
    PassWord: Yup.string().required("Password is required"),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    const { AdminName, PassWord } = values

    if (AdminName === "dhanush" && PassWord === "Edupoly") {
      navigate("/Adminboard")
    } else {
      alert("Invalid Admin Name or Password")
    }

    setSubmitting(false)
  }

  return (
    <div className="admin-login-container">
      <Formik initialValues={{ AdminName: "", PassWord: "" }} validationSchema={adminSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="admin-login-form">
            <h2 className="admin-login-title">Admin Login</h2>

            <div className="admin-login-form-group">
              <label htmlFor="AdminName" className="admin-login-label">
                Admin Name
              </label>
              <Field type="text" name="AdminName" className="admin-login-input" placeholder="Enter Admin Name" />
              <ErrorMessage name="AdminName" component="div" className="admin-login-error" />
            </div>

            <div className="admin-login-form-group">
              <label htmlFor="PassWord" className="admin-login-label">
                Password
              </label>
              <Field type="password" name="PassWord" className="admin-login-input" placeholder="Enter Password" />
              <ErrorMessage name="PassWord" component="div" className="admin-login-error" />
            </div>

            <button type="submit" className="admin-login-button" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Admin

