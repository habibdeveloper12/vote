import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Naboo = () => {
  const [selectedMP, setSelectedMP] = useState(""); // State to hold the selected MP
  const navigate = useNavigate();
  const handleVoteChange = (event) => {
    setSelectedMP(event.target.value);
  };
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/");
  }
  const handleVoteSubmission = async () => {
    // Perform actions for submitting the vote, e.g., send data to the backend
    console.log("Selected MP:", selectedMP);
    try {
      // Perform additional checks for password and confirm password

      const response = await axios.post(
        `http://localhost:5001/api/v1/user/vote?voterid=${user?.email}`,
        {
          vote: selectedMP,
        }
      );
      console.log(response.data);

      // Handle success or redirect to dashboard
    } catch (error) {
      console.error("Signup failed", error);
    }
    // Add your logic for submitting the vote
  };
  return (
    <div>
      <div class="container mt-5">
        <h2>Naboo Valley</h2>

        <div class="form-group">
          <label for="voteConstituency" style="color: #007BFF;">
            Select MP to Vote:
          </label>
          <select class="form-control" id="voteConstituency" required>
            <option value="" disabled selected>
              Select Constituency
            </option>
            <option value="MP 1 - Blue Party">MP 1 - Blue Party</option>
            <option value="MP 2 - Red Party">MP 2 - Red Party</option>
            <option value="MP 3 - Yellow Party">MP 3 - Yellow Party</option>
            <option value="MP 4 - Independent">MP 4 - Independent</option>
          </select>
        </div>

        <button onClick={handleVoteSubmission} className="btn btn-primary">
          Cast Vote
        </button>
      </div>
    </div>
  );
};

export default Naboo;
