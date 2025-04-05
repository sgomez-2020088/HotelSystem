'use strict '
import jwt from 'jsonwebtoken'
import { findUser } from '../helpers/db.validators.js'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        const validateUser = await findUser(user.uid)
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - Unauthorized'
            }
        )
        req.user = {
            id: validateUser._id,
            email: validateUser.email,
            role: validateUser.role
        }
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}


