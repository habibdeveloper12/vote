import React from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, user2, loading2, error2] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    try {
      // const response = await axios.post('http://localhost:5001/login', {
      //   email,
      //   password,
      // });
      // console.log(response.data);
      signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      toast.error(error.message);
      console.error("Login failed", error);
    }
  };
  if (loading2) {
    return <Loading />;
  }
  if (error2) {
    console.log(error2);
    toast.error(error2.message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  if (user) {
    toast.success("Successfully logged!", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("email", {
            required: "Email is required",
            pattern: /^\S+@\S+$/i,
          })}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="exampleInputPassword1"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Log in
      </button>
    </form>
  );
};

export default Login;
