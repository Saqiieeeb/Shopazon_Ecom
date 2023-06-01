import { useEffect, useState } from "react";
import "./Body.css";
import ProductItem from "./ProductItem";

function Body() {
  

  const [products,setProducts] = useState([]);

  // const cart = useSelector((state)=>state.cart.cart)

  // console.log(cart);

  const fetchProducts = async () =>{
    await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then((data)=>setProducts(data));

  }

  useEffect(()=>{
    fetchProducts();
    //console.log(products);
  },[]);

  return (
    <div className="body">
     <div className="bodyItems">
      {products.map((item,index)=>(
        <ProductItem item={item} key={item.id}/>
      ))}
    
     </div>
    </div>
  )
}

export default Body
