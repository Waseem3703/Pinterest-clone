import jwt from "jsonwebtoken";


const GenerateToken =(id, res)=>{
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("token" , token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });


};

export default GenerateToken;