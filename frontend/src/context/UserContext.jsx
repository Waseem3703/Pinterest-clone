import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 🔥 Fix: Empty object instead of array
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(
                "/api/user/register",
                { name, email, password },
                { withCredentials: true } // 🔥 Fix: Ensure cookies are sent
            );
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setBtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                { withCredentials: true } // 🔥 Fix: Ensure cookies are sent
            );
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setBtnLoading(false);
        }
    }

    async function FetchUser() {
        try {
            const { data } = await axios.get("/api/user/me", {
                withCredentials: true, // 🔥 Fix: Ensures auth data is retrieved
            });

            if (data?.user) {
                setUser(data.user);
                setIsAuth(true);
            } else {
                setUser(null);
                setIsAuth(false);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
            setIsAuth(false);
        } finally {
            setLoading(false); // 🔥 Fix: Ensure it runs once
        }
    }

    useEffect(() => {
        FetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ loginUser, btnLoading, isAuth, user, loading, registerUser }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
