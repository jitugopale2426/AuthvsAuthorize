import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req,res,next)=>{
    try {
        const token = req.header('auth-token') || req.query.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    
    const decoded = jwt.verify(token,JWT_SECRET)
    console.log("Decoded token",decoded)
    req.user = decoded;
    next();
    } catch (error) {
        return res.status(401).json({message:"Server Unauthorized"});
    }
}

export const adminMiddleware = (req,res,next)=>{
    try {
        const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    
    const decoded = jwt.verify(token,JWT_SECRET)
    console.log("Decoded token",decoded)
    req.user = decoded;
    console.log(decoded)

    if(decoded.role === 'Admin'){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"});
    }
    
    } catch (error) {
        return res.status(401).json({message:"Server Unauthorized"});
    }
}