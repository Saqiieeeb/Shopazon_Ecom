import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselComponent() {
  return (
    <div style={{ marginTop: -5.6 }}>
      <Carousel swipeable={true} autoPlay={true} showArrows={true}>
        <div>
          <img src="https://m.media-amazon.com/images/G/31/img22/Wireless/Meghana/iQOO/ChangeZ7/NoOffer/D81609324_WLD_iQOO-Z7_BAU_Design_SIM_1400x800._CB590182220_._SX3000_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/Homepage_DesktopHeroTemplate_3000x1200v3._CB592770274_._SX3000_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Kartik/MAYGTM2022/2023/D11_HeroPC_3000x1200_rev._CB589422742_._SX3000_.jpg" />
        </div>
        <div>
          <img src="https://m.media-amazon.com/images/G/31/img23/Wireless/ssserene/GW/May23/BAU/10R/v1/D43000892_WLD_OnePlus_Pickle_NewLaunch_catpage_1400x800._CB588282308_.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
