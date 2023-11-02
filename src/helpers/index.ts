import crypto from 'crypto'

export const random = () => crypto.randomBytes(128).toString('base64')


const SECRETE_OP2 = process.env.SECRET || "SSS"
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRETE_OP2).digest('hex')
}