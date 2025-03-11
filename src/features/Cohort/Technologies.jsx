import { Formik, Form, Field } from "formik";
import React from "react";
import {
  useAddCohortMutation,
  useGetAllCohortsListsQuery,
  useAddStudentMutation,
  useRemoveStudentMutation, // Import the remove mutation
} from "../../service/Leads.js";
import "./Techs.css"; // Updated CSS import

function Techs() {
  const [addCohort] = useAddCohortMutation();
  const [addStudent] = useAddStudentMutation();
  const [removeStudent] = useRemoveStudentMutation(); // Use mutation for removing student
  const { data: cohorts, refetch } = useGetAllCohortsListsQuery();

  // Remove student function
  const handleRemoveStudent = async (cohortTitle, studentName) => {
    
    try {
      await removeStudent({ cohortTitle, studentName }).unwrap();
      alert("Student removed successfully!");
      refetch(); // Refetch data to update UI
    } catch (error) {
      console.error("Error removing student:", error);
      alert("Error removing student. Please try again.");
    }
  };

  return (
    <div className="techs-container">
      {/* Add Cohort Section */}
      <div className="techs-add-cohort">
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
              <Field
                id="title"
                name="title"
                type="text"
                placeholder="Enter cohort name"
                className="techs-input"
              />
              <button type="submit" className="techs-button">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Cohort List */}
      <h2 className="techs-cohort-title">Cohort List</h2>
      <div className="techs-cohort-grid">
        {cohorts?.map((cohort, index) => (
          <div key={index} className="techs-cohort-card">
            <h3>{cohort.title}</h3>

            {/* Add Student Form */}
            <Formik
              initialValues={{ studentName: "" }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await addStudent({
                    cohortTitle: cohort.title,
                    studentName: values.studentName,
                  }).unwrap();
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
                <Form className="techs-student-form">
                  <Field
                    name="studentName"
                    type="text"
                    placeholder="Enter student name"
                    className="techs-student-input"
                  />
                  <button type="submit" className="techs-student-button">
                    Add
                  </button>
                </Form>
              )}
            </Formik>

            {/* Display Students */}
            <ul className="techs-student-list">
              {cohort.students?.length > 0 ? (
                cohort.students.map((student, index) => (
                  <li key={index} className="techs-student-item">
                    {student.name} &nbsp;
                    <button
                      onClick={() =>
                        handleRemoveStudent(cohort.title, student.name)
                      }
                      className="techs-student-button"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li className="techs-no-students">No students added</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Techs;
