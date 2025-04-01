import { Formik, Form, Field } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddCohortMutation,
  useGetAllCohortsListsQuery,
  useAddStudentMutation,
  useRemoveStudentMutation,
  useDeleteCohortMutation,
  useUpdateCohortMutation,
} from "../../service/Leads.js";
import "./Techs.css";

function Techs() {
  const [addCohort] = useAddCohortMutation();
  const [addStudent] = useAddStudentMutation();
  const [removeStudent] = useRemoveStudentMutation();
  const { data: cohorts, refetch } = useGetAllCohortsListsQuery();
  const [deleteCohort] = useDeleteCohortMutation();
  const [updateCohort] = useUpdateCohortMutation();
  const navigate = useNavigate();

  const handleRemoveStudent = async (cohortTitle, studentName) => {
    try {
      await removeStudent({ cohortTitle, studentName }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error removing student:", error);
      alert("Error removing student. Please try again.");
    }
  };

  const handleDeleteCohort = async (id) => {
    try {
      await deleteCohort({ id }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  async function handleUpdate(id, currentTitle) {
    const newTitle = prompt("Enter new Cohort name", currentTitle);

    if (newTitle && newTitle.trim() !== "") {
      try {
        await updateCohort({ id, title: newTitle }).unwrap();
        alert("Cohort updated successfully!");
        refetch();
      } catch (error) {
        console.error("Error updating cohort:", error);
        alert("Error updating cohort. Please try again.");
      }
    }
  }

  return (
    <div className="techs-container">
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
              <Field name="title" type="text" placeholder="Enter cohort name" className="techs-input" />
              <button type="submit" className="techs-button">Save</button>
            </Form>
          )}
        </Formik>
      </div>

      <h2 className="techs-cohort-title">Cohort List</h2>
      <div className="techs-cohort-grid">
        {cohorts?.map((cohort) => (
          <div className="techs-cohort-header" key={cohort._id}>
            <h3>{cohort.title.toUpperCase()}</h3>
            <i className="bi bi-pencil" onClick={() => handleUpdate(cohort._id, cohort.title)}></i>
            <i className="bi bi-trash3-fill text-danger" onClick={() => handleDeleteCohort(cohort._id)}></i>

            {/* Add from this Cohort button */}
            <button
              className="techs-button"
              onClick={() => navigate("/AddCohorts", { state: { sourceCohort: cohort } })}
            >
              Add from this Cohort
            </button>

            <Formik
              initialValues={{ studentName: "" }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await addStudent({
                    cohortTitle: cohort.title,
                    studentName: values.studentName,
                  }).unwrap();
                 
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
                  <Field name="studentName" type="text" placeholder="Enter student name" className="techs-student-input" />
                  <button type="submit" className="techs-student-button">Add</button>
                </Form>
              )}
            </Formik>

            <ul className="techs-student-list">
              {cohort.students?.length > 0 ? (
                cohort.students.map((student, index) => (
                  <li key={index} className="techs-student-item">
                    {student.name}
                    <button onClick={() => handleRemoveStudent(cohort.title, student.name)} className="techs-student-button">
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
