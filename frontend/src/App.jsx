import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/loading";
import NavBar from "./components/NavBar";

function App(){
     const {loading, isAuth, user } = UserData();
  return(
  <>
         {
            loading ?(
               <Loading/>
            ):
            (
               <BrowserRouter>
               {isAuth && <NavBar user={user}/>}
               <Routes>
                  <Route path="/" element={isAuth ?<Home />: <Login/>} />
                  <Route path="/login" element={isAuth ?<Home />: <Login/>} />
                  <Route path="/register" element={isAuth ?<Home />: <Register />} />
  
               </Routes>  
            </BrowserRouter>
            )
            
         }
  
  </>
);
};
export default App;