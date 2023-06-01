import "./Signup.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All Fields are required", { autoClose: 2000 });
      return;
    }

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setSubmitButtonDisabled(false);
        // console.log(userCredential);

        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });
         
        toast.success("Your account has been created. Please sign in",{
          autoClose:1500,
        })
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      })
      .catch((error) => {
        setSubmitButtonDisabled(false);
        toast.error(error, { autoClose: 2000 });
        console.error(error);
      });
  };

  return (
    <>
      <div className="signup-mainContainer">
        <div className="signup-logo" onClick={() => navigate("/")}>
          <ShoppingCartCheckoutRoundedIcon
            style={{ color: "#fd9a15", fontSize: 40, margin: "auto" }}
          />
          <h1 style={{ fontSize: 31, color: "black", margin: "auto" }}>
            Shopazon
          </h1>
        </div>

        <div className="signup-Container">
          <div className="signup-box">
            <h1 className="signup-Text">Create Account</h1>
            <div className="signup-inputDiv">
              <label style={{ fontSize: 13, fontWeight: 600 }}>Your Name</label>
              <input
                type="text"
                className="signup-input"
                placeholder="First and last name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signup-inputDiv">
              <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
              <input
                type="text"
                className="signup-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-inputDiv">
              <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
              <input
                type="password"
                className="signup-input"
                placeholder="At least 6 characters"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signup-btnDiv">
              <input
                type="submit"
                value={"Create your Shopazon account"}
                className="signup-btn"
                onClick={signUp}
                disabled={submitButtonDisabled}
              />
            </div>
            <div className="signup-divText1">
              By creating an account or logging in, you agree to Shopazon’s
              Conditions of Use and Privacy Policy.
            </div>
            <div className="signup-divText2">Need Help?</div>
          </div>

          <div className="signup-divText1">
            Already have an account?{" "}
            <Link to={"/signin"} style={{ color: "#0066c0" }}>
              Sign in
            </Link>
          </div>
        </div>
        <div className="signup-bottom">
          <hr style={{ marginBottom: 10, opacity: 0.5 }} />© 1996-2023,
          Shopazon.com, Inc. or its affiliates
        </div>
      </div>
    </>
  );
}

export default Signup;
