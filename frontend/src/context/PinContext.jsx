import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


const PinContext = createContext();

export const PinProvider = ({ children }) => {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pin, setPin] = useState(null);

    async function fetchPins() {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/pin/all");
            setPins(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPins();
    }, []);

    async function updatePin(id, title, pin, setEdit) {

        try {
            const {data} = await axios.put("/api/pin/" + id, {title, pin});
            toast.success(data.message);
            fetchPin(id);
            setEdit(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    async function fetchPin(id) {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/pin/" + id); // Ensure id is a string
            setPin(data);
        } catch (error) {
            console.error("Error fetching pin:", error.response?.data || error.message);
        }
        setLoading(false);
    }
    

    return (
        <PinContext.Provider value={{ pins, loading, fetchPin, pin, updatePin }}>
            {children}
        </PinContext.Provider>
    );
};

export const PinData = () => useContext(PinContext);
