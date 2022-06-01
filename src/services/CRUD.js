const { reject, promise } = require("bcrypt/promises")
var bcrypt = require('bcryptjs');
import res from 'express/lib/response';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);


let createUser = async(data) =>{
     return new Promise(async(resolve,reject)=>{
            try {
                let hashPasswordFromBcypt= await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password:hashPasswordFromBcypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth : null,
                    phoneNumber :data.phoneNumber,
                    address: data.address,
                    gender: data.gender===1 ? true :false ,
                    roleid: data.roleId
                })

                resolve('OK. create susseed');
            } catch (e) {
                reject(e)
            }
     })

 }
let hashPassword =(password)=>{
        return new Promise(async(resolve,reject) => {

            try {
                let hash = await bcrypt.hashSync(password, salt);
                // Store hash in your password DB
                resolve(hash);
            } catch (e) {
                reject(e)
            }
    
        })
}

let getUser =()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users = await db.User.findAll({
                raw :true 
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let getUserInfoBodyId= (userID) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where :  { id: userID },
                raw :true
            })

            if(user){
                resolve(user)
            }else{
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
let updateUserData=(data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where : {id :data.id}
            })
            if(user){
                user.firstName=data.firstName
                user.lastName=data.lastName
                user.address=data.address
                user.phoneNumber=data.phoneNumber

                await user.save()
                let allUser = await db.User.findAll();
                resolve(allUser)
            }else{
                resolve()
            }      
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserByID=(userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where : {id:userId}
            })
            if(user){
                user.destroy()               
            }
                resolve()      
        } catch (e) {
            reject(e)
        }
    })  
}
module.exports ={
     createUser : createUser,
     getUser: getUser,
     hashPassword: hashPassword,
     getUserInfoBodyId:getUserInfoBodyId,
     updateUserData:updateUserData,
     deleteUserByID:deleteUserByID
 }