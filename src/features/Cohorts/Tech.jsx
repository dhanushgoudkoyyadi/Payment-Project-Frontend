import { Formik, Form, Field } from "formik";
import React from "react";
import {
  useAddCohortMutation,
  useGetAllCohortsListsQuery,
  useAddStudentMutation,
} from "../../service/Leads.js";
import "./Tech.css"; // Import the CSS file

function Tech() {
  const [addCohort] = useAddCohortMutation();
  const [addStudent] = useAddStudentMutation();
  const { data: cohorts, refetch } = useGetAllCohortsListsQuery();

  return (
    <div className="tech-container">
      {/* Add Cohort Section */}
      <div className="add-cohort-container">
        <h2>Add Cohort</h2>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await addCohort(values).unwrap();
              alert("Cohort added successfully!");
              resetForm();
              refetch();
            } catch (error) {
              console.error("Error adding cohort:", error);
              alert("Error adding cohort. Please try again.");
            }
          }}
        >
          {() => (
            <Form>
              <Field id="title" name="title" type="text" placeholder="Enter cohort name" />
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Cohort List */}
      <h2 className="cohort-list-container">Cohort List</h2>
      <div className="cohort-grid">
        {cohorts?.map((cohort, index) => (
          <div key={index} className="cohort-card">
            <h3>{cohort.title}</h3>

            {/* Add Student Form */}
            <Formik
              initialValues={{ studentName: "" }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await addStudent({ cohortTitle: cohort.title, studentName: values.studentName }).unwrap();
                  alert("Student added successfully!");
                  resetForm();
                  refetch();
                } catch (error) {
                  console.error("Error adding student:", error);
                  alert("Error adding student. Please try again.");
                }
              }}
            >
              {() => (
                <Form className="student-form">
                  <Field name="studentName" type="text" placeholder="Enter student name" />
                  <button type="submit">Add</button>
                </Form>
              )}
            </Formik>

            {/* Display Students */}
            <ul className="student-list">
              {cohort.students?.length > 0 ? (
                cohort.students.map((student, index) => <li key={index}>{student.name}</li>)
              ) : (
                <li className="no-students">No students added</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tech;
