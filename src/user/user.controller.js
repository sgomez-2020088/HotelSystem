import { checkPassword, encrypt } from "../../utils/encrypt.js"
import User from "./user.model.js"
import mongoose from "mongoose"

export const getAll = async(req, res)=>{
    try {
        const { limit = 20, skip = 0 } = req.body
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0) return res.status(404).send({ message: 'Users not found', success: false })
        return res.send({success: true, message: 'Users found', users, total: users.length})
    }catch(err){
        console.error(err)
        return res.status(500).send({success: false, message: 'General error', err}
        )
    }
}

export const getOne = async(req, res)=>{
    try {
        const { id } = req.body
        const user = await User.findById(id)

        if(!user) return res.status(404).send({success: false, message: 'User not found'})
        return res.send({success: true, message: 'User found', user})

    }catch(err){
        console.error(err)
        return res.status(500).send({success: false, message: 'General error', err}
        )
    }
}

export const updateUser = async(req, res) =>{
    try {
        const userId = req.user.uid
        const { data } = req.body

        const userToUpdate = await User.findById(userId)
        if(!userToUpdate) return res.status(404).send({success: false,message: 'User not found'})

        const updateUser = await User.findByIdAndUpdate(userId, data, {new: true})
        return res.send({success: true,message: 'User updated',updateUser})

    } catch(err){
        console.error(err)
        return res.status(500).send({success: false,message: 'General error', err})
    }
}


export const updatePassword = async(req, res) => {
    try {
        const id = req.params.uid
        const { currentPassword, newPassword } = req.body

        if(!id || !currentPassword || !newPassword){
            console.log('Missing required fields')
            return res.status(400).send({success: false,message: 'All fields are required: id, currentPassword, newPassword'})
        }

        const user = await User.findById(id)
        if (!user){
            console.log('User not found in DB')
            return res.status(404).send({success: false,message: 'User not found'})
        }

        const isMatch = await checkPassword(user.password, currentPassword)
        if (!isMatch){
            return res.status(400).send({success: false, message:  'Current password is incorrect'})
        }

        const hashedPassword = await encrypt(newPassword)
        user.password = hashedPassword
        await user.save()

        return res.send({success: true, message: 'Password updated successfully'})

    } catch(err){
        console.error(err)
        return res.status(500).send({success: false,message: 'General error', err})
    }
}


export const updateUserRole = async (req, res) => {
    try {
        const { id, role } = req.body

        const userUpdated = await User.findById(id)
        if (!userUpdated) 
            return res.status(404).send({ success: false, message: 'User not found' })

        if (userUpdated.role === role)
            return res.status(403).send({ success: false, message: 'User already has this role' })

        if (userUpdated.role === 'ADMIN' && role === 'USER') 
            return res.status(403).send({ success: false, message: 'You cannot downgrade an ADMIN to USER' })

        userUpdated.role = role
        await userUpdated.save()

        return res.send({ success: true, message: 'User role updated', user: userUpdated })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General error', err })
    }
}

export const deleteOne = async (req, res) => {
    try {
        const userId = req.params.uid

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({success: false, message: "Invalid user ID"})}

        const user = await User.findById(userId)
        if (!user) {return res.status(404).send({success: false,message: "User not found",})}

        user.status = false
        await user.save()

        return res.send({success: true,message: "User desactivated",})

    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false,message: "General error",err})
    }
}