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
import { toast } from "react-toastify";
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
  const codesArray = [
    "HH64FWPE",
    "BBMNS9ZJ",
    "KYMK9PUH",
    "WL3K3YPT",
    "JA9WCMAS",
    "Z93G7PN9",
    "WPC5GEHA",
    "RXLNLTA6",
    "7XUFD78Y",
    "DBP4GQBQ",
    "ZSRBTK9S",
    "B7DMPWCQ",
    "YADA47RL",
    "9GTZQNKB",
    "KSM9NB5L",
    "BQCRWTSG",
    "ML5NSKKG",
    "D5BG6FDH",
    "2LJFM6PM",
    "38NWLPY3",
    "2TEHRTHJ",
    "G994LD9T",
    "Q452KVQE",
    "75NKUXAH",
    "DHKVCU8T",
    "TH9A6HUB",
    "2E5BHT5R",
    "556JTA32",
    "LUFKZAHW",
    "DBAD57ZR",
    "K96JNSXY",
    "PFXB8QXM",
    "8TEXF2HD",
    "N6HBFD2X",
    "K3EVS3NM",
    "5492AC6V",
    "U5LGC65X",
    "BKMKJN5S",
    "JF2QD3UF",
    "NW9ETHS7",
    "VFBH8W6W",
    "7983XU4M",
    "2GYDT5D3",
    "LVTFN8G5",
    "UNP4A5T7",
    "UMT3RLVS",
    "TZZZCJV8",
    "UVE5M7FR",
    "W44QP7XJ",
    "9FCV9RMT",
  ];

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

      if (codesArray.includes(data.uvc)) {
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
      } else toast("please add correct uvc");

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
