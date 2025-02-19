import React from 'react'
import {Formik,Form,Field} from 'formik'
import * as Yup from 'yup'
function Admin() {
    
const adminSchema = Yup.object().shape({
    AdminName: Yup.string().required("Required ..."),
    PassWord: Yup.string().required("Required ..."),
})
  return (
    <div>
   <Formik
   initialvalues={{
    AdminName: '',
    PassWord: '',
   }}
   validationSchema={adminSchema}
   onSubmit={values}
   >
    <Form>
        <Field type="text" name="AdminName" placeholder="Admin Name"/>
        <Field type="password" name="PassWord" placeholder="PassWord"/>
        <Button type="submit">Submit</Button>
    </Form>
   </Formik>
    </div>
  )
}

export default Admin