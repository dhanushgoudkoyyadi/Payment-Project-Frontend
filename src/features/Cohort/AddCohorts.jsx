import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  useGetAllCohortsListsQuery, 
  useAddStudentsToCohortMutation 
} from "../../service/Leads";
import "./add-cohort.css"
function AddCohorts() {
  const location = useLocation();
  const initialSourceCohort = location.state?.sourceCohort || null;
  const { data: cohorts = [], refetch } = useGetAllCohortsListsQuery();
  const [currentCohort, setCurrentCohort] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [addStudentsToCohort] = useAddStudentsToCohortMutation();
  const [sourceCohort, setSourceCohort] = useState(initialSourceCohort);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialSourceCohort) {
      setSourceCohort(initialSourceCohort);
    }
  }, [initialSourceCohort]);

  const handleStudentSelection = (studentName) => {
    setSelectedStudents(prev => ({
      ...prev,
      [studentName]: !prev[studentName]
    }));
    setError(null);
  };

  const handleSelectAllStudents = () => {
    if (!sourceCohort?.students?.length) return;
    
    // Check if all students are currently selected
    const allCurrentlySelected = sourceCohort.students.every(
      student => selectedStudents[student.name]
    );

    // If all are selected, clear the selection
    // If not all are selected, select all
    const newSelection = {};
    if (!allCurrentlySelected) {
      sourceCohort.students.forEach(student => {
        newSelection[student.name] = true;
      });
    }
    
    setSelectedStudents(newSelection);
    setError(null);
  };

  const handleAddStudents = async () => {
    setError(null);
    setIsLoading(true);
    
    if (!currentCohort?._id) {
      setError("Please select a target cohort.");
      setIsLoading(false);
      return;
    }

    const studentNames = Object.entries(selectedStudents)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name);

    if (studentNames.length === 0) {
      setError("Please select at least one student to add.");
      setIsLoading(false);
      return;
    }

    // Check if students are already in the target cohort
    const existingStudentNames = currentCohort.students.map(s => s.name);
    const studentsToAdd = studentNames.filter(
      name => !existingStudentNames.includes(name)
    );

    if (studentsToAdd.length === 0) {
      setError("Selected students are already in the target cohort.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        toCohortId: currentCohort._id,
        studentNames: studentsToAdd,
        fromCohortId: sourceCohort?._id
      };

      console.log("Sending payload:", payload);
      const response = await addStudentsToCohort(payload).unwrap();
      
      console.log("✅ Server Response:", response);
      
      alert(response.message || "Students added successfully!");
      
      // Reset selection and refetch to get updated cohort data
      setSelectedStudents({});
      setCurrentCohort(null);
      refetch();
    } catch (error) {
      console.error("❌ Error adding students:", error);
      
      if (error.data) {
        setError(error.data.message || "Failed to add students");
      } else if (error.status === 400) {
        setError("Invalid request. Please check your selections.");
      } else {
        setError("Failed to add students. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCount = Object.values(selectedStudents).filter(Boolean).length;
  const isAllSelected = sourceCohort?.students?.length > 0 && 
    sourceCohort.students.every(student => selectedStudents[student.name]);

  return (
    <div className="container p-4">
      <h2 className="mb-4">Move Students Between Cohorts</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3>Source Cohort</h3>
            </div>
            <div className="card-body">
              {sourceCohort ? (
                <>
                  <h4>{sourceCohort.title}</h4>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button 
                      onClick={handleSelectAllStudents}
                      className="btn btn-sm btn-secondary"
                      disabled={!sourceCohort.students?.length}
                    >
                      {isAllSelected ? "Unselect All" : "Select All"}
                    </button>
                    <p className="mb-0">Selected: {selectedCount} / {sourceCohort.students?.length || 0} students</p>
                  </div>
                  
                  <ul className="list-group">
                    {sourceCohort.students?.length > 0 ? (
                      sourceCohort.students.map((student) => (
                        <li key={student.name} className="list-group-item">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={!!selectedStudents[student.name]}
                              onChange={() => handleStudentSelection(student.name)}
                              id={`student-${student.name}`}
                            />
                            <label className="form-check-label" htmlFor={`student-${student.name}`}>
                              {student.name}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No students in this cohort</li>
                    )}
                  </ul>
                </>
              ) : (
                <p>Please select a source cohort from the Cohorts page</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3>Target Cohort</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h4>Select Target Cohort</h4>
                <div className="list-group">
                  {cohorts
                    .filter(c => !sourceCohort || c._id !== sourceCohort._id)
                    .map((cohort) => (
                      <button
                        key={cohort._id}
                        className={`list-group-item list-group-item-action ${
                          currentCohort?._id === cohort._id ? "active" : ""
                        }`}
                        onClick={() => setCurrentCohort(cohort)}
                      >
                        {cohort.title}
                      </button>
                    ))}
                </div>
              </div>
              
              {currentCohort && (
                <div className="mt-3">
                  <h5>Current Students in {currentCohort.title}:</h5>
                  <ul className="list-group">
                    {currentCohort.students?.length > 0 ? (
                      currentCohort.students.map(student => (
                        <li key={student.name} className="list-group-item">
                          {student.name}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No students yet</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button 
          onClick={handleAddStudents} 
          className="btn btn-primary btn-lg"
          disabled={!currentCohort || selectedCount === 0 || isLoading}
        >
          {isLoading ? "Transferring..." : " Move Selected Students"}
        </button>
      </div>
    </div>
  );
}

export default AddCohorts;