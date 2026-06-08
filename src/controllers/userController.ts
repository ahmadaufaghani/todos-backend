import User from '../models/User';
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import {Response, Request, NextFunction} from "express-serve-static-core";
import {StringValue} from "ms";

interface UserRequest {
    username : string,
    password: string
}

interface BackendUserPayload extends JwtPayload {
  payload: number, 
  iat: number, 
  exp: number 
}

const jwtVerifyPromisified = (token: string, secret: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, payload) => {
            if (err) {
                reject(err);
            } else {
                resolve(payload);
            }
        });
    });
}

export const protect = async (req: Request<{},{},UserRequest>, res: Response, next : NextFunction) => {
    try {
        let token;
        if( req.header("authorization") && req.header("authorization")?.startsWith("Bearer")) {
            token = req.header("authorization")?.split(" ")[1];
        }

        if (!token) {
            return res.status(400).json({
                status:"error",
                message:"You're not logged in! Please log in."
            })
        }

        const decoded = await jwtVerifyPromisified(token!, process.env.JWT_SECRET || "my-todos-identifier") as BackendUserPayload;

        const currentUser = await User.findOne({where : {id: decoded.id}})
        if(!currentUser) {
            return res.status(400).json({
                status:"error",
                message:"User doesn't exist!"
            })
        }

        req.user = currentUser;

        next(); 
    } catch (err) {
        res.status(500).json({
            status:"error",
            message: (err as Error).message
        });
    }
    
}

export const login = async (req: Request<{},{},UserRequest>, res: Response) => {
    try {
        const body = req.body;
        const user = await User.findOne({
            where : {username : body.username}
        });

        if(!req.body.username || !req.body.password) {
            return res.status(400).json({
                status:"error",
                message: "Please provide username and password!"
            });
        }

        if(!user || !(await bcrypt.compare(body.password,user.password))) {
        return res.status(401).json({
                status:"error",
                message: "Username or password incorrect!"
            });
        }

        const secretKey: Secret = process.env.JWT_SECRET || "my-todos-identifier";
        const expires = process.env.JWT_EXPIRES_IN as StringValue || "30d";

        const token = jwt.sign({id: user.id}, secretKey, {
            expiresIn : expires
        });
        
        res.status(200).json({
            status:"success",
            token: token,
            data: user
        });  
    } catch (err) {
        res.status(500).json({
            status:"error",
            message: (err as Error).message
        });
    }
    
};

export const register = async (req: Request<{},{},UserRequest>, res: Response) => {
    try {
        const body = req.body;

        if(req.body.password.length < 8) {
            return res.status(400).json({
                status:"error",
                message: "Password length must be 8 or more!"
            });
        }

        if( !body.username || !body.password) {
            return res.status(400).json({
                status:"error",
                message:"Please enter your username and password!"
            });
        }

        const user = await User.create(body);

        const secretKey: Secret = process.env.JWT_SECRET || "my-todos-identifier";
        const expires = process.env.JWT_EXPIRES_IN as StringValue || "30d";

        const token = jwt.sign({id: user.id}, secretKey, {
            expiresIn : expires
        });

        res.status(200).json({
            status:"success",
            token:token,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status:"error",
            message: (err as Error).message
        });
    }
   
};

export const getUserById = async (req: Request<{userId: string}>, res: Response) => {
    try {
        const params = req.params.userId;
        const user = await User.findOne({
            where: {id: Number(params)}
        });
        
        res.status(200).json({
            status:"success",
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status:"error",
            message: (err as Error).message
        });
    }
   
};