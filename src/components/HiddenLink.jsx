import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/AuthSlice"


export const ShowOnLogIn = ({children}) => {

  const isLoggedIn = useSelector(selectIsLoggedIn)
  if(isLoggedIn){
    return children;
  }
  else{
    return null;
  }
};
