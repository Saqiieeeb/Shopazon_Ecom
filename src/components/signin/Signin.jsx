import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // setErrMsg("All Fields are required")
      toast.error("All Fields are required", { autoClose: 2000 });
      return;
    }
    // setErrMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setSubmitButtonDisabled(false);
        // console.log(userCredential);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        if (err.code === "auth/invalid-email") {
          // setErrMsg("Wrong credentials! Please try again");
          toast.error("Wrong credentials! Please try again", {
            autoClose: 2000,

          });
        } else {
          // setErrMsg(err.message);
          toast.error(err.message, { autoClose: 2000 });
        }
        console.error(err.message);
      });
  };
  return (
    <>
      <div className="signin-mainContainer">
        <div className="signin-logo" onClick={() => navigate("/")}>
          <ShoppingCartCheckoutRoundedIcon
            style={{ color: "#fd9a15", fontSize: 40, margin: "auto" }}
          />
          <h1 style={{ fontSize: 31, color: "black", margin: "auto" }}>
            Shopazon
          </h1>
        </div>

        <div className="signin-Container">
          <div className="signin-box">
            <h1 className="signin-Text">Sign in</h1>
            <div className="signin-inputDiv">
              <label style={{ fontSize: 13, fontWeight: 600 }}>
                Enter mobile phone number or email
              </label>
              <input
                type="text"
                className="signin-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signin-inputDiv">
              <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
              <input
                type="password"
                className="signin-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signin-btnDiv">
              <input
                type="submit"
                value={"Sign in"}
                className="signin-btn"
                disabled={submitButtonDisabled}
                onClick={handleSubmit}
              />
            </div>
            <div className="signin-divText1">
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice
            </div>
            <div className="signin-divText2">Need Help?</div>
          </div>

          <div className="signin-divider">
            <h5>New to Shopazon?</h5>
          </div>
          <div>
            <Link to={"/signup"}>
              <button className="signin-createBtn">
                Create your Shopazon account
              </button>
            </Link>
          </div>
        </div>

        <div className="signin-bottom">
          <hr style={{ marginBottom: 10, opacity: 0.5 }} />© 1996-2023,
          Shopazon.com, Inc. or its affiliates
        </div>
      </div>
    </>
  );
}

export default Signin;
