import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import "./Cart.css";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { selectIsLoggedIn } from "../redux/AuthSlice";
import emptycartimg from "../assets/empty-cart.jpg"
import { addOrder } from "../redux/OrderSlice";
 
function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const subtotal = cart
    .map((item) => item.price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  const charges = Math.round(subtotal * 0.05);

  const totalPrice = subtotal + charges;

  
  const orders = [{order_id:"Shopazon_" + crypto.randomUUID(),order_date:new Date().toString(),products:[...cart],subtotal,charges,totalPrice}];

  // console.log("orders:",orders)

  const incrementItemQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decrementItemQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const placeOrder = () => {
    if (isLoggedIn) {
      toast.success(" Order Placed!");

      setTimeout(() => {
        navigate("/orderdetails", {
          state: {
            orders,
            totalPrice,
          },
        });
      }, 3500);

      dispatch(addOrder(orders));

      setTimeout(() => {
        dispatch(cleanCart());
      }, 4000);

  
    } else {
      toast.error("Sign in to complete your order",{
        autoClose:1500
      });
      setTimeout(()=>{
        navigate("/signin");
      })

    }
  };

  return (
    <>
      <Header />
      <div className="cart">
        {/*Left Part */}
        {cart.length === 0 ? (
          <div style={{ margin: "auto",textAlign:"center", marginBottom:40 }}>
            <br />
            <h1 className="message" >Your Shopazon Cart is Empty</h1>
            <br />
            <img src={emptycartimg} style={{height:350,width:350}} alt="" />
          </div>
        ) : (
          <div className="cartLeftPart">
            {cart?.map((item, index) => (
              <div className="cartContainer" key={index}>
                {/* image */}
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt="item-image"
                    style={{ width: 100, height: 100 }}
                  />
                </div>

                {/* description */}
                <div className="cartDescription">
                  <p>
                    {item.title.length > 60
                      ? item.title.substr(0, 60)
                      : item.title}
                  </p>

                  <p style={{ marginTop: 8 }}>${item.price}</p>
                </div>

                {/* buttons */}
                <div className="cartButtonContainer">
                  <div className="cartButtons">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => decrementItemQuantity(item)}
                    >
                      -
                    </div>
                    <div style={{ fontSize: 14 }}>Qty: {item.quantity}</div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => incrementItemQuantity(item)}
                    >
                      +
                    </div>
                  </div>
                  <button
                    className="removeButton"
                    onClick={() => removeItemFromCart(item)}
                  >
                    Remove from Cart
                  </button>
                  <h5 style={{ marginTop: 7 }}>
                    ${item.price * item.quantity}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        )}

        {/*Right Part */}
        {subtotal === 0 ? (
          <div>{}</div>
        ) : (
          <div className="cartRightPart">
            {/* Location Info and button */}
            <div className="cartRightLocationContainer">
              <div className="cartRightLocation">
                <LocationOnOutlinedIcon style={{ color: "gray" }} />
                <div className="cartRightLocationDescription">
                  <p className="cartRightText">Select Your Location</p>
                  <p className="cartRightText">
                    Please select a location so we can find you
                  </p>
                  <button className="locationButton">Select Location</button>
                </div>
              </div>
              <div className="cartRightLocation">
                <LocationOnOutlinedIcon style={{ color: "gray" }} />
                <div className="cartRightLocationDescription">
                  <p className="cartRightText">Choose Your Saved Location</p>
                  <button className="locationButton">Choose Location</button>
                </div>
              </div>
            </div>

            {/* Coupon Info and description */}
            <div className="cartRightCoupon">
              <ConfirmationNumberOutlinedIcon
                style={{ color: "gray", marginTop: 4 }}
              />
              <div style={{ marginLeft: 10 }}>
                <h4 className="cartRightCouponText">Apply Coupon Code</h4>
                <p className="cartRightCouponTextSmall">
                  Apply coupons to avail offers on the product
                </p>
              </div>
            </div>

            {/* Container for checkout and total  */}

            <div className="cartRightCheckoutContainer">
              <div className="cartRightCheckout">
                <h5>Item(s) Subtotal</h5>
                <h5>${subtotal.toFixed(2)}</h5>
              </div>

              <div className="cartRightCheckout">
                <h5>Charges</h5>
                <h5>${charges.toFixed(2)}</h5>
              </div>

              <div className="cartRightCheckout">
                <h5>Discount</h5>
                <h5>--</h5>
              </div>

              

              <div className="cartRightCheckout">
                <h3>Grand Total</h3>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>

              <div className="cartRightCheckout">
                <button
                  className="cartRightCheckoutButton"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
