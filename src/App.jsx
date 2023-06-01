
import './App.css'
import { Routes,Route, useLocation } from 'react-router-dom';
import Home from './screens/Home';
import Cart from './screens/Cart';
import OrderScreen from './screens/OrderScreen';
import ProductDetails from './screens/ProductDetails';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import { useState,useEffect } from 'react';
import { auth } from './firebase';
import { ToastContainer } from "react-toastify";
import YourList from './screens/YourList';
import { useDispatch } from 'react-redux';
import { setActiveUser } from './redux/AuthSlice';
import Orders from './screens/Orders';



function App() {

  // const [isAuthenticated,setIsAuthenticated] = useState(false);
  // const [authUser,setAuthUser] = useState("");
  const dispatch = useDispatch();

  // console.log("loggedin:",isAuthenticated);
  // console.log("userName:",authUser);

  // useEffect(()=>{
  //   const listen = auth.onAuthStateChanged((user)=>{

  //     if(user){
  //       // setAuthUser(user);
  //       // setIsAuthenticated(true)
  //       const {displayName,email,uid} = user;
  //       // console.log(user.displayName);
  //       dispatch(setActiveUser({
  //           name:displayName,email,uid
  //       }));
  //     }
  //     else{
  //       // setAuthUser(""); 
  //     }

  //   })
  // },[dispatch])

  
  return (
    <div className="App">
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        style={{fontSize:13}}/>

      <Routes>
        <Route path='/' element={<Home/ >}></Route>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/wishlist' element={<YourList/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/orderdetails' element={<OrderScreen/>}></Route>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>

      </Routes>
    </div>
  )
}

export default App;
