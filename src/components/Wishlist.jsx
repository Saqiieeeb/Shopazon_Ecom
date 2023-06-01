import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import Rating from "@mui/material/Rating";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { addToCart, incrementQuantity } from "../redux/CartSlice";
import { removeFromWishlist } from "../redux/WishlistSlice";
import { toast } from "react-toastify";
import emptywishlistimg from "../assets/empty-wishlist.png";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state)=>state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(wishlist);

  const addItemToCart = (item) => {
    if (cart.some((x) => x.id === item.id)) {
      toast.success("item already in cart updating quantity",{
        autoclose:1500,
      })
      dispatch(incrementQuantity(item));
    } else {
      toast.success("Item added to cart",{
        autoClose:1000,
      })
      dispatch(addToCart(item));
    }
   
  };

  const deleteItemFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <div className="wishlist-main-div">
      {wishlist.length === 0 ? (
        <>
          <div style={{ margin: "auto", textAlign: "center", marginBottom:40}}>
            <br />
            <h1 className="message">Your Wish List is Empty</h1>
            <br />
            <img src={emptywishlistimg} alt="" />
            
          </div>
        </>
      ) : (
        <>
          <div className="wishlist-heading">Your Wish List</div>

          <div className="wishlist-container" >
            {wishlist.map((item) => (
              <>
                <div className="wishlist-item-container">
                  <div className="wishlist-item-img">
                    <img
                      src={item.image}
                      alt=""
                      style={{ height: 135, width: 135 }}
                    />
                  </div>
                  <div className="wishlist-item-details" >
                    <div style={{ marginBottom: 15 }}>
                      <h2 className="wishlist-item-details-title">
                        {" "}
                        {item?.title}{" "}
                      </h2>
                    </div>
                    <div className="wishlist-item-details-rating" >
                      <Rating
                        value={item.rating.rate || null}
                        precision={0.2}
                        readOnly
                        style={{ fontSize: "20px", height: 18, width: 80 }}
                      />
                    </div>
                    <div className="wishlist-item-details-price" >
                      ${item?.price}
                    </div>
                  </div>
                  <div className="wishlist-item-buttons" >
                    <div style={{ marginBottom: 10 }}>
                      <button className="wishlist-item-cart-btn" onClick={()=>addItemToCart(item)}>
                        Add to Cart
                      </button>
                    </div>
                    <div style={{ display: "flex", columnGap: 30 }}>
                      <button className="wishlist-item-delete-btn" onClick={()=>deleteItemFromWishlist(item)}>
                        {" "}
                        <DeleteOutlineOutlinedIcon
                          style={{ fontSize: 20 }}
                        />{" "}
                      </button>
                      <button className="wishlist-item-gotocart-btn" onClick={()=>navigate("/cart")}>
                        {" "}
                        Go to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))} 
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
