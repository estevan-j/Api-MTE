import express from 'express'
import { login, register } from '../controllers/authentication'

const router = express.Router()
register

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login)
}