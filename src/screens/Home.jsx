import "./Home.css";
import Header from "../components/Header";
import CarouselComponent from "../components/CarouselComponent";
import Body from "../components/Body";
import Footer from "../components/Footer";


function Home() {


  return (
    <div className="home">
      {/*Header */}
      <Header/>


      {/*Carousel Banner */}
      <CarouselComponent/>

      {/* Body */}
      <Body />

      {/*Footer */}
      <Footer />
    </div>
  );
}

export default Home;
