import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import auth from "../../firebase.init";

const HomePage = () => {
  const [selectedMP, setSelectedMP] = useState("");
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        console.log("Fetching user information...");
        const response = await axios.get(
          `http://localhost:5001/api/v1/user/peruser?voterid=${user?.email}`
        );
        console.log("Response from the server:", response);
        setUserData(response?.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInformation();
  }, [user]); // State to hold the selected MP

  const handleVoteChange = (event) => {
    setSelectedMP(event.target.value);
  };

  // if (!user) {
  //   navigate("/");
  // }

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
      <div className="container mt-5">
        <h2> {userData?.constituency}</h2>

        <div className="form-group">
          <label htmlFor="voteConstituency">Select MP to Vote:</label>
          <select
            className="form-control"
            id="voteConstituency"
            value={selectedMP}
            onChange={handleVoteChange}
            required
          >
            <option value="" disabled>
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

export default HomePage;
