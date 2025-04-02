import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddCohortMutation,
  useGetAllCohortsListsQuery,
  useAddStudentMutation,
  useRemoveStudentMutation,
  useDeleteCohortMutation,
  useUpdateCohortMutation,
  useUploadVideoMutation,
  useAddCohortVideoMutation, // New mutation for adding video to a cohort
  useGetCohortVideosQuery, // New query to get cohort videos
} from "../../service/Leads.js";
import "./Techs.css";

function Techs() {
  const [addCohort] = useAddCohortMutation();
  const [addStudent] = useAddStudentMutation();
  const [removeStudent] = useRemoveStudentMutation();
  const { data: cohorts, refetch } = useGetAllCohortsListsQuery();
  const [deleteCohort] = useDeleteCohortMutation();
  const [updateCohort] = useUpdateCohortMutation();
  const [uploadVideo, { isLoading: isUploading }] = useUploadVideoMutation();
  const [addCohortVideo] = useAddCohortVideoMutation();
  const navigate = useNavigate();

  // Selected cohort for video upload
  const [selectedCohortId, setSelectedCohortId] = useState("");
  
  // Video upload state
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  
  // YouTube embed state
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selectedCohortForYoutube, setSelectedCohortForYoutube] = useState("");

  // Toggle states to show/hide videos per cohort
  const [expandedCohorts, setExpandedCohorts] = useState({});

  const toggleCohortVideos = (cohortId) => {
    setExpandedCohorts(prev => ({
      ...prev,
      [cohortId]: !prev[cohortId]
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    if (!selectedCohortId) {
      setMessage("Please select a cohort for this video");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      // Upload the video file
      const result = await uploadVideo(formData).unwrap();
      
      // Associate the video with the selected cohort
      await addCohortVideo({
        cohortId: selectedCohortId,
        videoUrl: `uploads/videos/${result.file}`,
        videoTitle: file.name
      }).unwrap();
      
      setMessage("Video uploaded and added to cohort successfully");
      setVideoUrl(`uploads/videos/${result.file}`);
      setUploadProgress(100);
      refetch(); // Refetch cohort data to update videos
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Upload failed. Try again.");
      setUploadProgress(0);
    }
  };

  const handleAddYoutubeVideo = async () => {
    if (!youtubeLink || !selectedCohortForYoutube) {
      setMessage("Please enter a YouTube URL and select a cohort");
      return;
    }

    const youtubeId = extractYouTubeID(youtubeLink);
    if (!youtubeId) {
      setMessage("Invalid YouTube URL");
      return;
    }

    try {
      // Associate the YouTube video with the selected cohort
      await addCohortVideo({
        cohortId: selectedCohortForYoutube,
        videoUrl: youtubeLink,
        videoTitle: "YouTube Video",
        videoType: "youtube"
      }).unwrap();
      
      setMessage("YouTube video added to cohort successfully");
      setYoutubeLink("");
      refetch();
    } catch (error) {
      console.error("Error adding YouTube video:", error);
      setMessage("Failed to add YouTube video. Try again.");
    }
  };

  const extractYouTubeID = (url) => {
    if (!url) return null;
    
    const match = url.match(/(?:youtube\.com\/.*(?:\?v=|\/embed\/|\/v\/|\/watch\?.*v=)|youtu\.be\/)([^#&?]*).*/);
    return match ? match[1] : null;
  };

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
            <div className="cohort-header-row">
              <h3>{cohort.title.toUpperCase()}</h3>
              <div className="cohort-actions">
                <i className="bi bi-pencil" onClick={() => handleUpdate(cohort._id, cohort.title)}></i>
                <i className="bi bi-trash3-fill text-danger" onClick={() => handleDeleteCohort(cohort._id)}></i>
                <i 
                  className={`bi ${expandedCohorts[cohort._id] ? 'bi-chevron-up' : 'bi-chevron-down'}`} 
                  onClick={() => toggleCohortVideos(cohort._id)}
                ></i>
                 {/* Video Upload Section */}
      <div className="video-upload-section">
        <h2>Upload a Video</h2>
        <div className="cohort-selector">
          <label htmlFor="cohort-select">Select Cohort:</label>
          <select 
            id="cohort-select" 
            value={selectedCohortId} 
            onChange={(e) => setSelectedCohortId(e.target.value)}
            className="cohort-select"
          >
            <option value="">-- Select a cohort --</option>
            {cohorts?.map((cohort) => (
              <option key={cohort._id} value={cohort._id}>
                {cohort.title}
              </option>
            ))}
          </select>
        </div>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button 
          onClick={handleUpload} 
          disabled={isUploading || !selectedCohortId}
          className="techs-button"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        <p>Progress: {uploadProgress}%</p>
        <p>{message}</p>

        {videoUrl && (
          <video width="400" controls className="preview-video">
            <source src={`http://localhost:5000/${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* YouTube Embed Section */}
      <div className="youtube-embed-section">
        <h2>Add YouTube Video to Cohort</h2>
        <div className="cohort-selector">
          <label htmlFor="youtube-cohort-select">Select Cohort:</label>
          <select 
            id="youtube-cohort-select" 
            value={selectedCohortForYoutube} 
            onChange={(e) => setSelectedCohortForYoutube(e.target.value)}
            className="cohort-select"
          >
            <option value="">-- Select a cohort --</option>
            {cohorts?.map((cohort) => (
              <option key={cohort._id} value={cohort._id}>
                {cohort.title}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="techs-input"
        />
        <button 
          onClick={handleAddYoutubeVideo} 
          disabled={!youtubeLink || !selectedCohortForYoutube}
          className="techs-button"
        >
          Add YouTube Video
        </button>
        {extractYouTubeID(youtubeLink) && (
          <div className="youtube-preview">
            <h3>Preview:</h3>
            <iframe
              width="400"
              height="225"
              src={`https://www.youtube.com/embed/${extractYouTubeID(youtubeLink)}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        )}
      </div>
              </div>
            </div>

            {/* Add from this Cohort button */}
            <button
              className="techs-button"
              onClick={() => navigate("/AddCohorts", { state: { sourceCohort: cohort } })}
            >
              Add from this Cohort
            </button>

            {/* Cohort Videos Section */}
            {expandedCohorts[cohort._id] && (
              <div className="cohort-videos">
                <h4>Cohort Videos</h4>
                <div className="video-list">
                  {cohort.videos && cohort.videos.length > 0 ? (
                    <div className="videos-grid">
                      {cohort.videos.map((video, index) => (
                        <div key={index} className="video-item">
                          <h5>{video.videoTitle || `Video ${index + 1}`}</h5>
                          {video.videoType === 'youtube' ? (
                            <iframe
                              width="280"
                              height="157"
                              src={`https://www.youtube.com/embed/${extractYouTubeID(video.videoUrl)}`}
                              frameBorder="0"
                              allowFullScreen
                              title={`YouTube ${index}`}
                            ></iframe>
                          ) : (
                            <video width="280" controls>
                              <source src={`http://localhost:5000/${video.videoUrl}`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No videos added to this cohort</p>
                  )}
                </div>
              </div>
            )}

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