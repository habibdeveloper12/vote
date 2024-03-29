import "@fontsource/montserrat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./component/Pages/HomePage";
import Navbar from "./component/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Western from "./component/Pages/Western";
import Northern from "./component/Pages/Northern";
import NewFelucia from "./component/Pages/NewFelucia";
import Naboo from "./component/Pages/Naboo";
import Commision from "./component/Pages/Commision";
import Register from "./component/Pages/Register";
import Login from "./component/Pages/Login";
import RequireAuth from "./component/hooks/RequireAuth";
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route
            path="/western/"
            element={
              <RequireAuth>
                <Western />
              </RequireAuth>
            }
          />
          <Route
            path="/northern/"
            element={
              <RequireAuth>
                <Northern />
              </RequireAuth>
            }
          />
          <Route
            path="/new-felucia/"
            element={
              <RequireAuth>
                <NewFelucia />
              </RequireAuth>
            }
          />
          <Route
            path="/naboo/"
            element={
              <RequireAuth>
                {" "}
                <Naboo />{" "}
              </RequireAuth>
            }
          />
          <Route
            path="/commision"
            element={
              <RequireAuth>
                <Commision />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
