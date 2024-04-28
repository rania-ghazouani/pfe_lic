const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient();
const bcrypt = require('bcrypt');



const findData = async ({ email}) => {
    try {
        const record = await prisma.user.findFirst({
            where: {
                email
            }
        });
                   return(record)
                                                                       
        } catch (error) {                                               
        return {
            error: true,
            message: "email doesn't exists"
        }
    }
}                                                                
    


const signUp = async({email, pwd, userType, userName}) => {
    try {
        
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(pwd, salt)
        const Roles = ["administrateur", "employe"];

        if(!Roles.includes(userType)){
            return {
                error: true,
                message: "Invalid userType provided"
            }
        } 
        if(pwd.length < 6) {
            return {
                error: true,
                message: "weak password"
            }
        }
            
            const created = await prisma.user.create({
                data: {
                    email,                                   
                    pwd: hashed,                                      
                    userType,
                    userName
                }, 
            });

                 return created
            
             
            
        }catch(error){
            return error.message
        }
}




const updateReset = async({email,resetLink}) =>{
    try {
        const update = await prisma.user.update({
            where:{
                email
            },
            data:{
                resetLink
            }
        });
        return update;
    } catch (error) {
        return {
            error: true,
            message: "reset password link error"
        }
    }
    
}

const findUserByResetLink = async({resetLink}) => {
    try {
        const found = await prisma.user.findFirst({
            where:{
                resetLink
            }
        });
       
        return (found);
    
    } catch (error) {
        return {
            error: true,
            message: "reset link not found"
        }
    }
}

const resetPwd = async({email,pwd, resetLink}) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(pwd, salt)
        if(pwd.length < 6) {
            return {
                error: true,
                message: "weak password"
            }
        }
        const updated = await prisma.user.update({
            where: {
              email
            },
            data:{
                pwd: hashed,
                resetLink: ''
            }
        });
        return updated;
    } catch (error) {
        return error.message
    }
}
const authService = {
    findData,
    signUp,
    updateReset, 
    findUserByResetLink,
    resetPwd
}

module.exports = authService