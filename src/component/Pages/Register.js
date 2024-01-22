import React from "react";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, cuser, loading, hookerror] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: false });
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [user] = useAuthState(auth);
  const handleSignup = async () => {};
  if (user) {
    navigate(from);
  }
  if (loading) {
    return <Loading></Loading>;
  }
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Perform additional checks for password and confirm password

      console.log("fg");
      try {
        const createUser = await createUserWithEmailAndPassword(
          data.voterid,
          data.password
        );
        if (createUser) {
          const response = await axios.post(
            "http://localhost:5001/api/v1/user/register",
            {
              data,
            }
          );
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }

      // Handle success or redirect to dashboard
    } catch (error) {
      console.error("Signup failed", error);
    }
  };
  return (
    <div className="container mt-5">
      <h2>Voter Registration</h2>
      <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="voterid">Voter ID (Email Address):</label>
          <input
            type="text"
            className="form-control"
            id="voterid"
            name="voterid"
            {...register("voterid", { required: "Voter ID is required" })}
          />
          {errors.voterid && <p>{errors.voterid.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            {...register("dob", { required: "Date of Birth is required" })}
          />
          {errors.dob && <p>{errors.dob.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="constituency">Constituency:</label>
          <select
            className="form-control"
            id="constituency"
            name="constituency"
            {...register("constituency", {
              required: "Constituency is required",
            })}
          >
            <option value="" disabled selected>
              Select Constituency
            </option>
            <option value="Shangri-La Town">Shangri-La Town</option>
            <option value="Northern Kunlun Mountain">
              Northern Kunlun Mountain
            </option>
            <option value="Western Shangri-La">Western Shangri-La</option>
            <option value="Naboo Valley">Naboo Valley</option>
            <option value="New Felucia">New Felucia</option>
          </select>
          {errors.constituency && <p>{errors.constituency.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="uvc">8 Digit Unique Voter Code (UVC):</label>
          <input
            type="text"
            className="form-control"
            id="uvc"
            name="uvc"
            {...register("uvc", { required: "UVC is required" })}
          />
          {errors.uvc && <p>{errors.uvc.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
