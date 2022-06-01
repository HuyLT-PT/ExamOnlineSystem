import db from '../models/index'
import CRUD, { createUser } from '../services/CRUD'
let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();

     /*   console.log('-------------------')
        console.log(data)
        console.log('-------------------') */

        return res.render('homepage.ejs',{
            data:JSON.stringify(data) })
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.send('aboutPage');
}

let getCRUD = (req,res) =>{{
    return res.render('crud.ejs')
}}

let postCRUD =async(req,res)=>{
    let message = await CRUD.createUser(req.body);
    console.log(message);
    return res.send('post CRUD');
}
let displayGetCRUD = async(req,res)=>{
    let data = await CRUD.getUser()
     // console.log('-----------')
     //  console.log(data)
     // console.log('---------')
    return res.render('displayCRUD',{
        dataT : data
    }) 


}

let getEditCRUD =async(req,res)=>{
    let userId =req.query.id
    //console.log(userId)
    if(userId){
        let userData= await CRUD.getUserInfoBodyId(userId)

        return res.render('edit.ejs',{
            user : userData
       })
     
    }else{
        return res.send('user not found')
    }
   
}
let putCRUD = async(req,res)=>{
    let data =req.body 
    let allUser =await CRUD.updateUserData(data)
    return res.render('displayCRUD.ejs',{
        dataT : allUser
   })
}

let deleteCRUD =async(req,res)=>{

    let id=req.query.id
    if(id){
        await CRUD.deleteUserByID(id)
        return res.send('deleted')
    }else{
        return res.send('not found')
    }
}
// object: {   key: '',   value: ''  }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}