import { useState } from "react"
import { useAddPaymentMutation, useGetUsersQuery } from "../../service/Leads"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Adminboard.css"
import { useNavigate } from "react-router-dom"
import Reactc from "../Coheart/Reactc"
import Angular from "../Coheart/Angular"

import Mean from "../Coheart/Mean"
function Adminboard() {
  const { data: users, error, isLoading } = useGetUsersQuery()
  const [addPayment] = useAddPaymentMutation()
  const [paymentValues, setPaymentValues] = useState({})
  const [paymentTypes, setPaymentTypes] = useState({})
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  console.log(users);
  const courseFees = {
    "MEAN Stack": 35000,
    "MERN Stack": 35000,
    "Frontend with Angular": 25000,
    "Frontend with React":25000,
    "Backend":20000,
    "Java Full Stack":35000,
    "Devops":20000,
    "Python":15000
  }

  const handleChange = (userId, value) => {
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [userId]: value,
    }))
  }

  const handleTypeChange = (userId, type) => {
    setPaymentTypes((prevTypes) => ({
      ...prevTypes,
      [userId]: type,
    }))
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [userId]: "",
    }))
  }

  const handleSubmit = async (userId, selectedCourse) => {
    if (!selectedCourse || !courseFees[selectedCourse]) {
      alert("Invalid course selection! Cannot determine course fee.")
      return
    }

    const totalFee = courseFees[selectedCourse]
    const value = paymentValues[userId]

    if (!value) {
      alert("Please enter a payment amount or percentage")
      return
    }

    let amount
    if (paymentTypes[userId] === "percentage") {
      const percentage = Number.parseFloat(value)
      if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
        alert("Enter a valid percentage (1-100)")
        return
      }
      amount = (percentage / 100) * totalFee
    } else {
      amount = Number.parseFloat(value)
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount")
        return
      }
    }

    if (amount > totalFee) {
      alert(`Payment amount cannot exceed ₹${totalFee}`)
      return
    }

    try {
      await addPayment({ userId, amount, totalFee }).unwrap()
      alert(`Payment of ₹${amount.toFixed(2)} discount offered! Total Fee: ₹${totalFee}`)
      setPaymentValues((prevValues) => ({ ...prevValues, [userId]: "" }))
    } catch (error) {
      console.error("Error adding payment:", error)
      alert("Failed to add payment.")
    }
  }

  const filteredUsers = users?.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="adminboard-container mt-5">
      <div className="adminboard-row justify-content-center">
        <div className="adminboard-header-wrapper text-center">
          <h1 className="adminboard-title position-fixed top-0 w-100 bg-light py-3 shadow" style={{ zIndex: 1000 }}>
            Registered Students
          </h1>
        </div>
      </div>

      <div className="adminboard-row justify-content-center mb-4 mt-5">
        <div className="adminboard-search-col col-md-6">
          <input
            type="text"
            placeholder="Search students..."
            className="adminboard-search-input form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <p className="adminboard-loading text-center text-muted">Loading Students...</p>}
      {error && <p className="adminboard-error text-center text-danger">Error fetching Students</p>}

      <div className="adminboard-students-container row" style={{ maxHeight: "500px", overflowY: "auto" }}>
        {filteredUsers?.map((user) => {
          const totalFee = courseFees[user.selectedCourse] || "Not Assigned"
          return (
            <div key={user._id} className="adminboard-student-col col-md-4 mb-4">
              <div className="adminboard-student-card card shadow-sm">
                <div className="adminboard-card-body card-body text-center">
                  <h5 className="adminboard-student-name card-title">{user.username.toUpperCase()}</h5>
                  <h6 className="adminboard-student-email">
                    Email: <span>{user.email}</span>
                  </h6>
                  <h6 className="adminboard-student-mobile">
                    Mobile: <span>{user.mobileNumber}</span>
                  </h6>
                  <h6 className="adminboard-student-course">
                    Course: <span>{user.selectedCourse}</span>
                  </h6>
                  <h6 className="adminboard-student-fee">
                    Total Fee: <span>₹{totalFee !== "Not Assigned" ? totalFee : "Not Available"}</span>
                  </h6>

                  <select
                    className="adminboard-payment-type form-control mt-3"
                    value={paymentTypes[user._id] || "amount"}
                    onChange={(e) => handleTypeChange(user._id, e.target.value)}
                  >
                    <option value="amount">Enter Amount (₹)</option>
                    <option value="percentage">Enter Percentage (%)</option>
                  </select>

                  <input
                    type="number"
                    value={paymentValues[user._id] || ""}
                    onChange={(e) => handleChange(user._id, e.target.value)}
                    placeholder={paymentTypes[user._id] === "percentage" ? "Enter percentage (%)" : "Enter amount (₹)"}
                    className="adminboard-payment-input form-control mt-2 text-center"
                  />

                  <button
                    onClick={() => handleSubmit(user._id, user.selectedCourse)}
                    className="adminboard-save-btn btn btn-primary mt-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Reactc></Reactc>
      <Angular></Angular>
      <MEAN></MEAN>
      <MERN></MERN>
    </div>
  )
}

export default Adminboard

