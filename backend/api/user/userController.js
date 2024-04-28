const authService = require("../auth/authService");
const userService = require("./userService")



const getAllUsers = async(req,res) => {
    try {
        const users = await userService.getAllUsers()
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOneUser = async(req,res) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await userService.getOneUser({userId})
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async(req,res) => {
    try {
        const userId = parseInt(req.params.id)
        const {userName, pwd, email} = req.body
        const updated = await userService.updateUser({userId,userName,email, pwd});
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async(req,res) => {
    try {
        const userId= parseInt(req.params.id); 
        const deleted = await userService.deleteUser({userId});
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const userName = async(req,res) => {
    try {
        const userId = req.user.userId
        const userName = req.user.userName;
        const username = await userService.userName({userId, userName});
        res.status(200).json(username);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
module.exports = {
    
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    userName
}