import React from "react";

const HomePage = () => {
  return (
    <div>
      <div class="container mt-5">
        <h2>Shangri-la Town</h2>

        <div class="form-group">
          <label for="voteConstituency">Select MP to Vote:</label>
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

        <button
          onclick="castVote()"
          className="btn btn-primary"
          // style="background-color: #007BFF; border-color: #007BFF;"
        >
          Cast Vote
        </button>
      </div>
    </div>
  );
};

export default HomePage;
