import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPix';

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) =>{
   const token = req.header('Authorization')?.replace('Bearer ', '');
   if (!token){
       return res.status(401).json({message: "Token não informado"});
   }
   try{
       const decoded = jwt.verify(token, JWT_SECRET);
       req.userId = (decoded as any).userId;
       next();
   } catch (error){
       return res.status(401).json({erro:error});
   }
}