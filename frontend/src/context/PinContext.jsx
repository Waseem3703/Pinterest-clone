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
    async function addComment(id, comment, setComment) {
        try {
            const {data} = await axios.post("/api/pin/comment/"+id, {comment});
            toast.success(data.message);
            fetchPin(id);
            setComment("");            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function deleteComment(id, commentId) {
        try {
            const {data} = await axios.delete(`/api/pin/comment/${id}?commentId=${commentId}`);
            toast.success(data.message);
            fetchPin(id);
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
    
    async function deletePin(id, navigate) {
        setLoading(true);
        try {
            const {data} = await axios.delete(`/api/pin/${id}`);
            toast.success(data.message);
            navigate("/");
            setLoading(false);
            fetchPins();
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    async function addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate) {
        try {
            const {data} = await axios.post("/api/pin/new", formData);
            toast.success(data.message);
            setFile([]);
            setFilePrev("");
            setPin("");
            setTitle("");
            fetchPins();
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }

    return (
        <PinContext.Provider value={{ 
            pins,
            loading,
            fetchPin,
            pin,
            updatePin,
            addComment,
            deleteComment,
            deletePin,
            addPin,
            fetchPins
                 }}>
            {children}
        </PinContext.Provider>
    );
};

export const PinData = () => useContext(PinContext);
