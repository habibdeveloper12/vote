import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";

const Commision = () => {
  const [start, setStart] = useState(false);
  const startElection = () => {
    setStart(true);
  };
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        console.log("Fetching user information...");
        const response = await axios.get(
          `http://localhost:5001/api/v1/user/all`
        );
        console.log("Response from the server:", response?.data);

        setUserData(response?.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, [user]);
  console.log(start);
  const endElection = () => {
    setStart(false);
  };
  return (
    <div>
      <div class="container">
        <h2>Election Commission Dashboard</h2>

        <div id="electionStatus">
          <h3>
            Election Status:{" "}
            <span id="status">{start ? "Processing" : "NOT Start"}</span>
          </h3>

          <button onClick={startElection} class="btn btn-primary">
            Start Election
          </button>

          <button class="btn btn-danger" onClick={endElection}>
            End Election
          </button>
        </div>

        <div id="realTimeResults">
          <h3>Real-time Election Results</h3>
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Constituency</th>
                <th>Candidate</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="constituency1">Shangri-La Town</td>
                <td>Party A</td>
                <td id="resultPartyA1">0</td>
              </tr>
              <tr>
                <td id="constituency1">Shangri-La Town</td>
                <td>Party B</td>
                <td id="resultPartyB1">{userData.length}</td>
              </tr>

              <tr>
                <td id="constituency2">Northern Kunlun Mountain</td>
                <td>Party A</td>
                <td id="resultPartyA2">{userData.length}</td>
              </tr>
              <tr>
                <td id="constituency2">Northern Kunlun Mountain</td>
                <td>Party B</td>
                <td id="resultPartyB2">{userData.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="electionResult">
          <h3>Election Result</h3>
          <p id="winnerAnnouncement">No Winner Yet</p>
        </div>
      </div>
    </div>
  );
};

export default Commision;
