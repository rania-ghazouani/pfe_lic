const authService = require('../authService');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxad2dded3cbae4e5fb21e9006d3b92ded.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});



const forgotPwd = async(req, res) => {
    const {email} = req.body;
    const user = await authService.findData({email});
    if(!user){
        return res.status(400).json({
            success: 0,
            message: "user with this mail does not exists"
        });
    } else if (user){
    //res.send(user);
    const token = jwt.sign({userId: user.userId}, process.env.RESET_PASSWORD_KEY, {expiresIn: '50m'});
    const data = {
        from: 'noreply@hello.com',
        to: email,
        subject: 'account activate Link',
        html: `<h2> Please click on given link to reset your password </h2>
                <a>${process.env.CLIENT_URL}/reset/${token}</a>`
    }
       
    const update = await authService.updateReset({email,resetLink: token})
    
        if(update){
                mg.messages().send(data, function (error,body) {
                    if(error){
                        return res.json({
                            error: err.message
                        });
                    } else {
                    return res.json({message: "email has been sent, check your mailbox"})
                    }
                });
               
        } else {
            return res.json({
                error: true,
                message: "error"
            });
        }
    
   }   
}

const resetPwd = (req,res) => {
    
        const {resetLink, pwd} =req.body;
        //const user = authService.findData({email})
                   //res.send(user);
        if(resetLink){
            
             jwt.verify(resetLink,process.env.RESET_PASSWORD_KEY, async function(err, decoded) {
                if(err){
                    return res.status(401).json({
                        error: "Incorrect token or it is expired."
                    });
                } else{

                    const user = await authService.findUserByResetLink({resetLink})
                   //res.send(user);
                    if(!user){
                        return res.status(400).json({
                            success: 0,
                            message: "user with this token does not exists"
                        });
                    }
                    /*else if (user.resetLink !== req.body.resetLink){
                        return res.status(400).json({
                            success: 0,
                            message: "user with this token does not exists"
                        });
                    
                    }*/ else{
                        const email = user.email;
                        
                        const reset = await authService.resetPwd({email, pwd, resetLink: ''})
                        //res.send(reset);
                        if(!reset){
                            return res.status(400).json({error: "reset password error"});
                        } else {
                            return res.status(200).json({message: "your password has been changed"})      
                        }
                    }
                }
            });
        } else {
            return res.status(400).json({
                success: 0,
                message: "authentication error!"
            });
        }

    
}



module.exports = {
    forgotPwd, 
    resetPwd
}