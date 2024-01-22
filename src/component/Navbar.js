import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../firebase.init";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        console.log("Fetching user information...");
        const response = await axios.get(
          `http://localhost:5001/api/v1/user/peruser?voterid=${user?.email}`
        );
        console.log("Response from the server:", response?.data);

        setUserData(response?.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, [user]);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the homepage after signing out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const constituencies = [
    "Shangri-La Town",
    "Northern Kunlun Mountain",
    "Western Shangri-La",
    "Naboo Valley",
    "New Felucia",
  ];

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              {userData?.userType == "user" ? (
                <>
                  <li class="nav-item">
                    <a class="nav-link" href="/commision">
                      {userData.constituency}
                    </a>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li class="nav-item">
                    <a class="nav-link" href="/commision">
                      commision
                    </a>
                  </li>
                </>
              )}
              {user ? (
                <li class="nav-item" onClick={handleSignOut}>
                  log out
                </li>
              ) : (
                <>
                  <li class="nav-item">
                    <a href="/login">Login</a>
                  </li>
                  <li class="nav-item">
                    <a href="/register">Register</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
