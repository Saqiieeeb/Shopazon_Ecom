import { useDispatch, useSelector } from "react-redux";
import "./ProductItem.css";
import {
  addToCart,
  incrementQuantity,
} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";



function ProductItem({ item }) {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = (item) => {
    if (cart.some((x) => x.id === item.id)) {
      toast.success("item already in cart updating quantity", { autoClose: 2000 });
      dispatch(incrementQuantity(item));
    } else {
      toast.success("1 item added to cart",{autoClose:2000});
      dispatch(addToCart(item));
    }
  };


  return (
    <div className="productItem">
      {/*image*/}
      <img
        src={item.image}
        style={{
          width: 200,
          height: 200,
          marginLeft: "auto",
          marginRight: "auto",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/products/${item.id}`);
        }}
      />

      {/*title of product*/}
      <p
        onClick={() => {
          navigate(`/products/${item.id}`);
        }}
        style={{ cursor: "pointer",fontWeight:"bold",fontSize:18 }}
      >
        {item.title.length > 30 ? item.title.substr(0, 30) : item.title}
      </p>

      {/* description  of product
      <p>
        {item.description.length > 60
          ? item.description.substr(0, 60)
          : item.description}
      </p> */}
  
      {/*Rating  of product*/}

      <div>
            <Rating
              value={item?.rating?.rate || null}
              precision={0.2}
              readOnly
              style={{ fontSize: "20px" }}
            />
          </div>

      <p style={{color:"#B12704",fontSize:22}}>${item.price}</p>

      {/*Add To Cart Button */}

      {/* {cart.some((x)=>x.id===item.id)?(
      <button className="productItemButton" onClick={()=>removeItemFromCart(item)}>Add to Cart</button>

      ):( */}

      <button
        className="productItemButton"
        onClick={() => 
          addItemToCart(item)
        }
      >
        Add to Cart
      </button>

      {/* )} */}

      {/*Buy Now Button */}
      <button className="productItemBuy">Buy Now</button>
    </div>
  );
}

export default ProductItem;
