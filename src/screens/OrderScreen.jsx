import { useLocation } from "react-router-dom";
import "./OrderScreen.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderScreen() {
  const location = useLocation();
  // console.log("location.state:", location.state);
  // console.log("totalPrice:", location.state.totalPrice);

  return (
    <>
      <Header />
      <div className="orders">
        <div>
          <h3>Your Order has been placed </h3>
          {location.state.orders.map((order) => (
            <div key={order.order_id} >
              <div className="orderContainer" key={order.order_id} >
                <div style={{ fontWeight: "bold", marginBottom: 10 }}>
                  ORDER ID : {order.order_id}
                </div>
                {order.products.map((product) => (
                  <>
                    <div style={{ display: "flex", marginBottom: 20 }} key={product.id}>
                      <img
                        style={{
                          width: 140,
                          height: 140,
                          backgroundColor: "#f7f7f7",
                        }}
                        src={product.image}
                        alt=""
                      />
                      <div className="orderDescription">
                        <p style={{ marginTop: 8 }}>{product.title}</p>
                        <p style={{ marginTop: 8 }}>
                          {product.description.length > 80
                            ? product.description.substr(0, 80)
                            : product.description}
                        </p>
                        <p style={{ marginTop: 8 }}>
                          Quantity : {product.quantity}
                        </p>

                        <p style={{ marginTop: 8 }}>
                          ${product.price * product.quantity}
                        </p>
                      </div>
                      <div className="orderButtonContainer">
                        <button className="orderButtons">Return Product</button>
                        <button className="orderButtons">
                          Download Invoice
                        </button>
                        <button className="orderButtons">Rate Product</button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
          {/* <hr style={{ marginTop: 10 }} /> */}
          <div className="line"></div>
          <h3 style={{ marginTop: 14, textAlign: "right" }}>
            Grand Total : ${location.state.totalPrice.toFixed(2)} (incl. of all
            charges)
          </h3>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderScreen;
