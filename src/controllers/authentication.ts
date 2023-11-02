import express from "express";
import { authentication, random } from "../helpers/index";
import StatusCodes from 'http-status-codes'
import { UserModel, createUser, getUserByEmail } from "../model/user";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} = req.body;
        if (!email || !password || !username){
            res.status(StatusCodes.BAD_REQUEST)
        }
        const existingUser = await getUserByEmail(email)
        if (!existingUser){
            res.status(StatusCodes.BAD_REQUEST)
        }
        const salt = random();
        console.log("Salt: "+salt)
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)// define que encripte primero y luego almacena
            }
        })
        return res.status(StatusCodes.OK).json(user).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }
}


export const login =async (req:express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST)
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user){
            return res.status(StatusCodes.BAD_REQUEST)
        }
        
        const expectedHash = authentication(user.authentication?.salt || " ", password)
        
        if (user.authentication?.password !== expectedHash) {
            return res.status(StatusCodes.BAD_REQUEST)
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'})

        return res.status(StatusCodes.OK).json(user).end();

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST)
    }
}