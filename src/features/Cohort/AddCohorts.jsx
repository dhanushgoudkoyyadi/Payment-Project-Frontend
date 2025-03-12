import React, { useState } from "react";
import { useGetAllCohortsListsQuery, useAddStudentsToCohortMutation } from "../../service/Leads";

function AddCohorts() {
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const { data: cohorts = [] } = useGetAllCohortsListsQuery();
  const [currentCohort, setCurrentCohort] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [addStudentsToCohort] = useAddStudentsToCohortMutation();

  const filteredCohorts = cohorts.filter((cohort) =>
    cohort.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCohorts1 = cohorts.filter((cohort) =>
    cohort.title.toLowerCase().includes(search1.toLowerCase())
  );


  const handleSelectCurrentCohort = (cohort) => {
    setCurrentCohort(cohort);
    console.log("Current Cohort Selected:", cohort);
  };

  const handleSelectSourceCohort = (cohort) => {
    setSelectedCohort(cohort);
    console.log("Source Cohort Selected:", cohort);
  };

  const handleAddStudents = async () => {
    if (!currentCohort || !selectedCohort) {
      alert("Please select both a current cohort and a source cohort.");
      return;
    }

    console.log("Adding students from:", selectedCohort, "to:", currentCohort);

    if (!selectedCohort._id || !currentCohort._id) {
      console.error("Cohort IDs are missing", selectedCohort, currentCohort);
      alert("Invalid cohort selection.");
      return;
    }

    try {
      await addStudentsToCohort({
        fromCohortId: selectedCohort._id,
        toCohortId: currentCohort._id,
      }).unwrap();

      alert("Students added successfully!");
    } catch (error) {
      console.error("Error adding students:", error);
      alert("Failed to add students.");
    }
  };

  return (
    <div className="adminboard-row justify-content-center mb-4 mt-5">
      <div className="adminboard-search-col col-md-6">
        <input
          type="text"
          placeholder="Search cohorts..."
          className="adminboard-search-input form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Select Current Cohort */}
      <div>
        <h5>Select Current Cohort (Target)</h5>
        <ul>
          {filteredCohorts.map((cohort) => (
            <li key={cohort._id}>
              <input
                type="radio"
                name="currentCohort"
                checked={currentCohort?._id === cohort._id}
                onChange={() => handleSelectCurrentCohort(cohort)}
              />{" "}
              {cohort.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Select Source Cohort */}
      <div>
        <h5>Select Source Cohort (Students will be copied from here)</h5>
        <input
          type="text"
          placeholder="Search cohorts..."
          className="adminboard-search-input form-control"
          value={search1}
          onChange={(e) => setSearch1(e.target.value)}
        />
        <ul>
          {filteredCohorts1.map((cohort) => (
            <li key={cohort._id}>
              <input
                type="radio"
                name="sourceCohort"
                checked={selectedCohort?._id === cohort._id}
                onChange={() => handleSelectSourceCohort(cohort)}
              />{" "}
              {cohort.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Button to add students */}
      <button onClick={handleAddStudents} className="btn btn-primary mt-3">
        Add Students
      </button>
    </div>
  );
}

export default AddCohorts;
