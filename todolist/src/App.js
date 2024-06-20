import { Routes, Route, Link, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import { useEffect } from "react";

import { useRecoilState } from 'recoil'; 
import userInfoAtom from './recoil/userInfoAtom'; // Adjust the import path
import { Login } from "@mui/icons-material";

function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    if(localStorage?.getItem('userStatus')?.includes('true')){
      setUserInfo(true);
    }else{
      setUserInfo(false);
    }
  }, [localStorage?.getItem('userStatus')]);

  return (
    <div>
      <Routes>
        <Route path="/" element={ userInfo === true ? <Home /> : <Navigate to='/signin'/> } />
        <Route path = "/signin" element={ userInfo === false ? <Signin /> : <Navigate to='/'/>} /> 
      </Routes>
    </div>
  );
}

export default App;
