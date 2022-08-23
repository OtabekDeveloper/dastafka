const userModel = require("../user/user.model")
async function Login(req , res){
    try {   
        let user = await userModel.findOne({
            username : req.body.username,
            tel : req.body.tel
        })
        if(user){
            return res.status(200).send(user)
        }
        return res.status(401).send("ushbu foydalanuvchi ro'yhatdan o'tmagan")
    } catch (err){
        return res.status(400).send(err)
    }
}

module.exports = {
    Login,
}