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
   initialValues={{
    AdminName: '',
    PassWord: '',
   }}
   validationSchema={adminSchema}
   onSubmit={(val)=>{console.log(val)}}
   >
    <Form>
        <Field type="text" name="AdminName" placeholder="Admin Name"/>
        <Field type="password" name="PassWord" placeholder="PassWord"/>
        <button type="submit">Submit</button>
    </Form>
   </Formik>
    </div>
  )
}

export default Admin