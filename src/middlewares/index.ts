import express from 'express'
import { StatusCodes } from 'http-status-codes'
import {get, merge} from 'lodash'
import { getUserBySessionToken } from 'model/user'


export const isAuthenticated = async (req:express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANTONIO-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser){
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        merge(req, {identity: existingUser});
        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }
}