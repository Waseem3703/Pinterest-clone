import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


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
        <PinContext.Provider value={{ pins, loading, fetchPin, pin }}>
            {children}
        </PinContext.Provider>
    );
};

export const PinData = () => useContext(PinContext);
