import { getUsers } from "../model/user"
import { StatusCodes } from "http-status-codes";
import express from 'express'

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        if (!users) {
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        res.status(StatusCodes.OK).json(users)
    } catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }
}
