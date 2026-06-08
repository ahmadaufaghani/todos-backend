import * as express from "express-serve-static-core";

interface UserRequest {
    id: number,
    username : string,
    password: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserRequest
        }
    }
}