import userService from "../services/userSevice"

let hendleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

   if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: ' missing inputs '
        })
    }
    
    let userData= await userService.handleUserLogin(email,password)

    return res.status(200).json({
        
        errCode: userData.errCode,
        message: userData.errMessage,
        user : userData.user? userData.user :{}   
    })
}

let hendleGetAllUsers = async (req, res) => {
    let id = req.query.id // all or id

    if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        users : []
    }) 
    }
    let users = await userService.getAllUsers(id)

    return res.status(200).json({
        errCode: 0 ,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleDeleteUser = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing require'
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser = async(req,res) => {
    let data =req.body 
    let message =await userService.updateUserData(data)
    return res.status(200).json(message)
}
module.exports= {
    hendleLogin: hendleLogin,
    hendleGetAllUsers: hendleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser:handleDeleteUser
}