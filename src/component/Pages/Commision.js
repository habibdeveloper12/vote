import React from "react";

const Commision = () => {
  return (
    <div>
      <div class="container">
        <h2>Election Commission Dashboard</h2>

        <div id="electionStatus">
          <h3>
            Election Status: <span id="status">Not Started</span>
          </h3>
          <button class="btn btn-primary" onclick="startElection()">
            Start Election
          </button>
          <button class="btn btn-danger" onclick="endElection()">
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
                <td id="resultPartyB1">0</td>
              </tr>

              <tr>
                <td id="constituency2">Northern Kunlun Mountain</td>
                <td>Party A</td>
                <td id="resultPartyA2">0</td>
              </tr>
              <tr>
                <td id="constituency2">Northern Kunlun Mountain</td>
                <td>Party B</td>
                <td id="resultPartyB2">0</td>
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
