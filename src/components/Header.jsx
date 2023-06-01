import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { useState, useEffect, useRef } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import {
  removeActiveUser,
  selectIsLoggedIn,
  setActiveUser,
} from "../redux/AuthSlice";
import { ShowOnLogIn } from "./HiddenLink";

function Header() {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  //  console.log("username:",user);
  //  console.log("logged in:",isLoggedIn);
  let [userName, setUserName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, [location]);


  useEffect(()=>{
    const listen = auth.onAuthStateChanged((user)=>{

      if(user){
        // setAuthUser(user);
        // setIsAuthenticated(true)
        const {displayName,email,uid} = user;
        // console.log(user.displayName);
        dispatch(setActiveUser({
            name:displayName,email,uid
        }));
        setUserName(displayName.slice(0,displayName.indexOf(" ")));

      }
      else{
        // setAuthUser("");
        setUserName("");

      }
      // console.log(userName);
    })
  },[dispatch,userName])



  // useEffect(() => {
  //   if (user == []) {
  //     setUserName("");
  //   } else {
  //     if (isLoggedIn) {
  //     } else {
  //     }
  //   }
  //   // console.log(userName);
  // }, [userName]);

  
  const navigateToCart = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      toast.error("You Need To Sign in to view Cart", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToOrders = () => {

    if (isLoggedIn) {
      navigate("/orders");
    } else {
      toast.error("You Need To Sign in to view your orders", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  
  };

  const handleSignIn = () =>{
  
    if(isLoggedIn){
      return;
    }
    else{
      navigate("/signin");
    }
  }

  // console.log(cart);

  const totalCartValue = cart
    .map((item) => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  // console.log(totalCartValue);

  const logOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // console.log("logged out");
        dispatch(removeActiveUser());
        toast.success("Signing Out", {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  // const defocus = (e) => {
  //   e.preventDefault();
  //   console.log("mouseOver initialzed");
  // };

  return (
    <>
      <div className="header">
        {/*Image Logo */}
        <div className="shopazonLogo" onClick={navigateToHome}>
          {/* <img
            style={{ width: 150, height: 50, marginTop: 10 }}
            className="image"
            src="./src/assets/ShopazonLogodark.png"
            alt="logo"
          /> */}
          <ShoppingCartCheckoutRoundedIcon
            style={{ color: "#fd9a15", fontSize: 40, margin: "auto" }}
          />
          <h1 style={{ fontSize: 22, color: "white", margin: "auto" }}>
            Shopazon
          </h1>
        </div>

        {/*Place and Number */}
        <div style={{display:"flex"}}>
          <LocationOnOutlinedIcon style={{color:"white",marginTop:5,fontWeight:400}}/>
          <div>
          <h4 className="headerText">{isLoggedIn?(`Deliver to ${userName}`):("Hi")}</h4>
          <span className="headerTextBold">{isLoggedIn?("Select Your Address"):("Select Location")}</span>
          </div>
          
        </div>

        {/*Search Bar*/} 
        <div className="headerInputContainer">
          <input
            className="headerInput"
            type="text"
            placeholder="Search Shopazon.in"
          />
          <div className="searchIcon">
            <SearchOutlinedIcon
              style={{ fontSize: 30, marginTop: 5, marginLeft: 7 }}
            />
          </div>
        </div>

        <div
          data-tooltip-id="my-tooltip"
          id="clickable"
          style={{ cursor: "pointer" }}
        >
          <h4 className="headerText"  onClick={() => handleSignIn()}>
            Hello, {userName == "" ? "sign in" : userName}
          </h4>
          <h4 className="headerTextBold">Accounts & Lists</h4>
          <ShowOnLogIn>
            <ReactTooltip
              id="my-tooltip"
              place="bottom"
              effect="solid"
              anchorSelect="#clickable"
              clickable
            >
              <div className="tooltip-container">
                <h3 className="tip-content-head">Your Account</h3>

                <p className="tip-content">Your Account</p>
                <Link to={"/orders"} style={{textDecoration:"none",color:"black"}}>
                <p className="tip-content" >Your Orders</p>
                </Link>
                <Link to={"/wishlist"} style={{textDecoration:"none",color:"black"}}>
                 <p className="tip-content">Your Wish List</p>
                </Link>
                <p className="tip-content" onClick={logOut}>
                  Sign Out
                </p>
              </div>
            </ReactTooltip>
          </ShowOnLogIn>
        </div>

        <div onClick={navigateToOrders} style={{ cursor: "pointer" }}>
          <h4 className="headerText">Returns</h4>
          <h4 className="headerTextBold">& Orders</h4>
        </div>

        <div
          onClick={navigateToCart}
          style={{ position: "relative", cursor: "pointer", display: "flex" }}
        >
          <div>
            <ShoppingCartOutlinedIcon
              style={{ fontSize: 34, color: "white", marginTop: 4 }}
            />
            <span
              style={{
                position: "absolute",
                left: 10,
                top: -6,
                backgroundColor: "#131921",
                width: 14,
                height: 14,
                borderRadius: 7,
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
                color: "#F08804",
              }}
            >
              {/* {cart.length} */}
              {totalCartValue}
            </span>
          </div>
          <div>
            <h4 className="headerTextBold" style={{ marginTop: 17 }}>
              Cart
            </h4>
          </div>
        </div>
      </div>

      {/*Bottom Header Part */}

      <div className="headerBottom" style={{ marginBottom: 0 }}>
        <MenuOutlinedIcon style={{ color: "white", paddingTop: 5 }} />

        <p className="headerBottomText">Amazon miniTV</p>
        <p className="headerBottomText">Sell</p>
        <p className="headerBottomText">Best Sellers</p>
        <p className="headerBottomText">Today's Deals</p>
        <p className="headerBottomText">Mobiles</p>
        <p className="headerBottomText">Customer Service</p>
        <p className="headerBottomText">Electronics</p>
        <p className="headerBottomText">New Releases</p>
        <p className="headerBottomText">Prime</p>
      </div>
    </>
  );
}

export default Header;
