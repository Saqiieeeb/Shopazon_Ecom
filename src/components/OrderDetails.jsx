import {useSelector} from "react-redux";
import { selectOrder } from "../redux/OrderSlice";
import "./OrderDetails.css";
import dayjs from "dayjs";

function OrderDetails() {

  const orders = useSelector(selectOrder);
  const orderlist = orders.slice(0).reverse();
  // console.log("orders:",orders);
  // console.log('reversed',orderlist)

  return (
    <>
      
      <div className="orderDetails-orders">
        {orderlist.length === 0  ? (
          <div style={{height:300,marginBottom:50}}>
            <h4>No Orders Placed</h4>
          </div>
        ) : (
          <div>
            <h3>Your Orders</h3>
            
          {orderlist.map((order) => (
            <div key={order.order_id}>
              <div className="orderDetails-orderContainer">
                
               <div style={{ fontWeight: "bold", marginBottom: 5 }}>ORDER PLACED : {dayjs(order.order_date).format("D MMMM YYYY")}</div>
                  
               <div style={{ fontWeight: "bold", marginBottom: 20 }}>ORDER ID : {order.order_id}</div>

               {order.products.map((product)=>(
                <>
                <div style={{display:"flex",marginBottom:20}}> 
                  <img
                    style={{
                      width: 140,
                      height: 140,
                      backgroundColor: "#f7f7f7",
                    }}
                    src={product.image}
                    alt=""
                  />
                  <div className="orderDetails-orderDescription">
                    <p style={{ marginTop: 8 }}>{product.title}</p>
                    <p style={{ marginTop: 8 }}>
                      {product.description.length > 80
                        ? product.description.substr(0, 80)
                        : product.description}
                    </p>
                    <p style={{ marginTop: 8 }}>Quantity : {product.quantity}</p>
                    <p style={{ marginTop: 8 }}>
                      ${product.price * product.quantity}
                    </p>
                  </div>
                  <div className="orderDetails-orderButtons">
                    <button className="orderDetails-orderButton">Return Product</button>
                    <button className="orderDetails-orderButton">Download Invoice</button>
                    <button className="orderDetails-orderButton">Rate Product</button>
                  </div>
                  
                  </div>
                  </>

                ))}
                <div className="orderDetails-line"></div>
                <h4 style={{ marginTop: 14, textAlign: "right" }}>
              Subtotal : ${order.subtotal.toFixed(2)}  
            </h4>

            <h4 style={{ marginTop: 14, textAlign: "right" }}>
              Charges{" "} :{" "} ${order.charges.toFixed(2)}  
            </h4>

            <h3 style={{ marginTop: 14, textAlign: "right" }}>
              Grand Total : ${order.totalPrice.toFixed(2)}  
            </h3>

                
                  
              </div>


              </div>
            ))}
            
            
          </div>
        )}
      </div>
      
    </>
  );
}

export default OrderDetails;
