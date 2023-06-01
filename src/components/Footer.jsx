import { useNavigate } from "react-router-dom";
import "./Footer.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";

function Footer() {
  const navigate = useNavigate();
  const scrollToTop = (e) => {
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <div>
        <div className="footerNav" onClick={(e) => scrollToTop(e)}>
          <p style={{ paddingTop: 10 }}>Back to top</p>
        </div>

        <div className="Footer">
          {/*Footer Top */}
          <div className="footerTop">
            <div className="accessibility">
              <div className="accessibilityHeading">
                <p>Get to Know Us</p>
              </div>
              <div>
                <ul>
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Press Releases</li>
                  <li>Shopazon Science</li>
                </ul>
              </div>
            </div>

            <div className="accessibility">
              <div className="accessibilityHeading">
                <p>Connect with Us</p>
              </div>
              <div>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                </ul>
              </div>
            </div>

            <div className="accessibility">
              <div className="accessibilityHeading">
                <p>Make Money with Us</p>
              </div>
              <div>
                <ul>
                  <li>Sell on Shopazon</li>
                  <li>Sell under Shopazon Accelerator</li>
                  <li>Protect and Build Your Brand</li>
                  <li>Shopazon Global Selling</li>
                  <li>Become an Affiliate</li>
                  <li>Advertise Your Products</li>
                  <li>Shopazon Pay on Merchants</li>
                </ul>
              </div>
            </div>

            <div className="accessibility">
              <div className="accessibilityHeading">
                <p>Let Us Help You</p>
              </div>
              <div>
                <ul>
                  <li>COVID-19 and Shopazon</li>
                  <li>Your Account</li>
                  <li>Returns Centre</li>
                  <li>100% Purchase Protection</li>
                  <li>Help</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{ cursor: "pointer", display: "flex", marginBottom: 30 }}
            onClick={(e) => {
              navigate("/");
              scrollToTop(e);
            }}
          >
            <ShoppingCartCheckoutRoundedIcon
              style={{ color: "#fd9a15", margin: "auto" }}
            />
            <h1 style={{ fontSize: 22, color: "white", margin: "auto" }}>
              Shopazon
            </h1>
          </div>

          {/*Footer Bottom*/}
          <div className="footerBottom">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              earum dolorem exercitationem harum, excepturi nobis maiores
              praesentium numquam impedit enim et ea officiis debitis sequi
              dolores recusandae aspernatur sint cumque. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Delectus, earum dolorem
              exercitationem harum, excepturi nobis maiores praesentium numquam
              impedit enim et ea officiis debitis sequi dolores recusandae
              aspernatur sint cumque. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Delectus, earum dolorem exercitationem harum,
              excepturi nobis maiores praesentium numquam impedit enim et ea
              officiis debitis sequi dolores recusandae aspernatur sint cumque.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              earum dolorem exercitationem harum, excepturi nobis maiores
              praesentium numquam impedit enim et ea officiis debitis sequi
              dolores recusandae aspernatur sint cumque.
            </div>

            <div>
              Conditions of Use & Sale Privacy Notice Interest-Based Ads ©
              1996-2023, Shopazon.com, Inc. or its affiliates
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
