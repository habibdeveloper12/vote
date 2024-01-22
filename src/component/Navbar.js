import { signOut } from "firebase/auth";
import React from "react";
import auth from "../firebase.init";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the homepage after signing out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const [user] = useAuthState(auth);
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
