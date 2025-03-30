import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function signToken(userId){
    return jwt.sign(userId, process.env.SECRET_KEY , { expiresIn:'7d'});
}

export function verifyToken(token){
    try{
        return jwt.verify(token, process.env.SECRET_KEY);
    }catch(error){
        throw new Error("jwt invalid");
    }
}
