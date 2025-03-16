import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import axios from 'axios';
import { Axis3DIcon } from "lucide-react";


const UserContext = createContext();


    export const UserProvider = ({children})=>{
        const [user, setUser] = useState([]);
        const [isAuth, setIsAuth] = useState(false);
        const [btnLoading, setBtnLoading] = useState(false);


        async function registerUser(name, email, password, navigate) {
            setBtnLoading(true)
            try { 
                const {data} = await axios.post("/api/user/register", {name, email, password});
                toast.success(data.message);
                setUser(data.user);
                setIsAuth(true);
                navigate("/");

            } catch (error) {
                toast.error(error.response.data.message);
                setBtnLoading(false);

                
            };
            
        };


        async function loginUser(email, password, navigate) {
            setBtnLoading(true)
            try { 
                const {data} = await axios.post("/api/user/login", {email, password});
                toast.success(data.message);
                setUser(data.user);
                setIsAuth(true);
                navigate("/");

            } catch (error) {
                toast.error(error.response.data.message);
                setBtnLoading(false);

                
            };
            
        };

        const[loading, setLoading] = useState(true);

        async function FetchUser() {
            try {
                const {data}  = await axios.get("/api/user/me",{
                withCredentials: true
            });

                setUser(data.user);
                setIsAuth(true);
                setLoading(false);
                
            } catch (error) {
                console.log(error);
                setIsAuth(false);
                setLoading(false);
                
            }
            finally {
                setLoading(false);
            }
            
        }
        useEffect(()=>{
            FetchUser();
        }, []);
    return (
    <UserContext.Provider 
    value={{ loginUser, btnLoading , isAuth, user, loading, registerUser}}
    >{children}<Toaster/></UserContext.Provider>
);
     };

export const UserData = () => useContext(UserContext);