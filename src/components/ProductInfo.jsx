import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/WishlistSlice";
import "./ProductInfo.css";
import Rating from "@mui/material/Rating";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import { selectIsLoggedIn } from "../redux/AuthSlice";
import { addToCart,incrementQuantity } from "../redux/CartSlice";

function ProductInfo() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state)=>state.cart.cart)
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // console.log("wishlist:", wishlist);

  const fetchProductDetails = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, []);

  // console.log(productDetails);
  const dispatch = useDispatch();


  const addItemToCart=(productDetails)=>{
 
    if(isLoggedIn){

      if (cart.some((x) => x.id === productDetails.id)) {
      
        toast.success("item already in cart updating quantity", { autoClose: 2000 });
        dispatch(incrementQuantity(productDetails));
      } else {
        toast.success("1 item added to cart",{autoClose:2000});
        dispatch(addToCart(productDetails));
      }
    }

    else{

      if (cart.some((x) => x.id === productDetails.id)) {
      
        toast.success("item already in cart updating quantity", { autoClose: 2000 });
        dispatch(incrementQuantity(productDetails));
      } else {
        toast.success("1 item added to cart",{autoClose:2000});
        dispatch(addToCart(productDetails));
      }
      // toast.error("Sign in to view cart", { autoClose: 1500 }); //optional code
      // setTimeout(() => {
      //   navigate("/signin");
      // }, 2000);
    }

  } 

  const addToWish = (productDetails) => {
    if (isLoggedIn) {
      const itemPresent = wishlist.find(
        (item) => item.id === productDetails.id
      );

      if (itemPresent) {
        // alert("item already present moving to top of wishlist");
        toast.success("Item already present moving it to top of Your List", {
          autoClose: 2000,
        });
        dispatch(addToWishlist(productDetails));
      } else {
        // alert("item added to wishlist");
        toast.success("Item added to Wish List", {
          autoClose: 2000,
        });
        dispatch(addToWishlist(productDetails));
      }
    } else {
      navigate("/signin");
    }
  };

  const accessWishlist = () => {
    if (isLoggedIn) {
      navigate("/wishlist");
    } else {
      toast.error("Sign in to view your List", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  };

  return (
    <>
      <div className="productInfo-main">
        <div className="productInfo-left">
          <h1 className="productInfo-bigText">
            <span>{productDetails.title}</span>
          </h1>
          <hr className="separator" />
          <div className="productInfo-img-div">
            <img
              className="productInfo-img"
              src={productDetails.image}
              alt="productimage"
            />
          </div>
        </div>
        <div className="separator"></div>
        <div className="productInfo-right">
          <div className="productInfo-price">$ {productDetails.price}</div>

          <div className="productInfo-location">
            <LocationOnOutlinedIcon style={{ color: "gray" }} />
            <div>
              <p className="productInfo-right-text">Deliver to your location</p>
              <button className="productInfo-locationButton">
                Select Location
              </button>
            </div>
          </div>

          <div className="productInfo-coupon">
            <ConfirmationNumberOutlinedIcon
              style={{ color: "gray", marginTop: 4, fontSize: 28 }}
            />
            <div style={{ marginLeft: 10 }}>
              <p className="productInfo-right-text-bold">Apply Coupon Code</p>
              <p className="productInfo-right-text">
                Apply coupons to avail offers on the product
              </p>
            </div>
          </div>

          <div className="productInfo-buttons-contianer">
            <div className="productInfo-button-div">
              <button
                className="productInfo-button"
                style={{ backgroundColor: "#ffd814" }}
                onClick={()=>addItemToCart(productDetails)}
              >
                Add to Cart
              </button>
            </div>

            <div className="productInfo-button-div">
              <button
                className="productInfo-button"
                style={{ backgroundColor: "#ffa41c" }}
              >
                Buy Now
              </button>
            </div>

            <div style={{ display: "flex", marginTop: 20, marginBottom: 10 }}>
              <LockIcon
                style={{ color: "gray", fontSize: 18, paddingRight: 10 }}
              />
              <p style={{ fontSize: 15, color: "#427e89" }}>
                Secure transaction
              </p>
            </div>

            <hr style={{ width: 300 }} />

            <div className="productInfo-button-div">
              <button className="productInfo-wish-button" onClick={()=>addToWish(productDetails)}>
                Add to Wish List
              </button>
              <button
                className="productInfo-wish-button"
                onClick={accessWishlist}
              >
                View Your List
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="separator" />
      <div className="productInfo-desc-div">
        <h2 className="productInfo-bigText" style={{ fontWeight: 700 }}>
          Product Description
        </h2>
        <p className="productInfo-desc">{productDetails.description}</p>

        <div style={{ display: "flex" }}>
          <div className="productInfo-desc" style={{ fontWeight: "bold" }}>
            Customer Rating : {productDetails?.rating?.rate}
          </div>

          <div style={{ marginTop: 8 }}>
            <Rating
              value={productDetails?.rating?.rate || null}
              precision={0.2}
              readOnly
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
