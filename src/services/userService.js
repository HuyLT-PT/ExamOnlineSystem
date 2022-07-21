import db from "../models/index"
import bcrypt from 'bcryptjs'
import { reject } from "bcrypt/promises"
import e from "express";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve,reject) => {
        try {
            let userData = {}
          
            let isExist = await checkUserEmail(email)         
            if (isExist) {
              // User already exist
                let user = await db.User.findOne(
                    {   
                        attributes: ['email','roleId','id', 'password','class','firstName','lastName'],
                        where: { email: email },
                        raw : true
                    }
                )
                if (user) {
                    //compare Password
                    let check = await bcrypt.compareSync(password,user.password);
                   // let check = true;
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK'
                        
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = 'User isnt exist'                    
                } 
               // resolve()
            } else {
                // return error
                userData.errCode = 1
                userData.errMessage = 'Your email isnt exist'  
                
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email : userEmail}
            })             
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        }catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    
                })
            }
            
            if (userId && userId !== 'ALL') {
                users = db.User.findOne({
                    where : { id :userId}
                }) 
            }

            resolve(users)
           
        }catch (e) {
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

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check email is exsist
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'email exsist'
                })
            } else {
                let hashPasswordFromBcypt = await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth: data.dateOfBirth,
                    class : data.class,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    gender: data.gender === 1 ? true : false,
                    roleid: data.roleId
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where : { id:id}
        })

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'user isnt exist'
            })
        }

        await db.User.destroy({
             where : { id:id}
        })

        resolve({
            errCode: 0,
            errMessage: 'deleted'
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {

        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage :' missing id'
                })
            }
             let user= await db.User.findOne({
                 where: { id: data.id } ,
                 raw : false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                user.class = data.class
                user.gender = data.gender
                user.dateOfBirth =data.dateOfBirth

            /*    await db.User.save({
                    firstName : data.firstName,
                    lastName: data.lastName,
                    address : data.address,
                    phoneNumber : data.phoneNumber

                })
                */
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'updated'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage : 'user not found'
                })
            }
        } catch (e) {
            reject(ejs)
        }
    })
}

let getAllStudents = (classId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = ''
            if (classId === 'ALL') {
                users = await db.User.findAll({
                    where: {
                        roleId: 1,
                    }
                    
                })
            }
            
            if (classId && classId !== 'ALL') {
                let classes = ''
                classes = await db.ClassIn4.findOne({
                    where: {
                        id : classId 
                    }
                })
                let className = classes.name
                users = db.User.findAll({
                    where: {
                        class: className,
                        roleId:1
                    }
                    
                }) 
            }

            resolve(users)
           
        }catch (e) {
            reject(e)
        }
    })
}
let updateStudentClass = (data) => {
    return new Promise(async(resolve, reject) => {

        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage :' missing id'
                })
            }
            let user= await db.User.findOne({
                 where: { id: data.id } ,
                 raw : false
            })
            if (user) {
                user.class = data.class
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'updated'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage : 'user not found'
                })
            }
        } catch (e) {
            reject(ejs)
        }
    })
}
let getTeacher = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let teacher = ''

            teacher = await db.User.findAll({
                attributes: ['id','firstName', 'lastName','Class'],
                where: {
                    roleId: 2
                }
            })

            resolve(teacher)
           
        }catch (e) {
            reject(e)
        }
    })
    
}
let getStudentWithExam = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
      
            let user = await db.User.findOne({
                where: {
                     id : userId
                }
      
            })
            
            let exams = await db.Exam.findAll({
                where: {
                    impClass: '12A1'
                }
            })
            let ans = []
             ans = await db.ExamAns.findAll({
                where: {
                     studentId: userId,
                }
                      
             }) 
            let resultExam = []
            let com = new Set()
            let list = []
            
            for (let i = 0; i < ans.length; i++){
                com.add(ans[i].examId)
                let c = {}
                c.examId = ans[i].examId
                c.result = ans[i].result
                resultExam.push(c)
            }
            for (let i = 0; i < exams.length; i++) {
                list.push(exams[i].id)
            }
            let arr = [... com] 
            let arr2 =[]
            for (let i = 0; i < list.length; i++) {
                if (list[i] !== arr[i]) {
                    arr2.push(list[i])
                }
            }
            let unCompleted= []
            for (let i = 0; i < arr2.length; i++) {
                

                let e = await db.Exam.findOne({
                    where: {
                        id : arr2[i]
                    }
                })
                unCompleted.push(e)
            }

            let r = []
            for (let i = 0; i < resultExam.length ; i++) {
                
                let c = {}
                c.Examid = resultExam[i].examId
                c.true = parseInt(resultExam[i].result)
                c.all = resultExam[i].result.slice(-2)
               
                r.push(c)
            }
          
            
          
     
            let data = {}
            data.allExam = exams.length
            data.completed = com.size
            data.unCompleted = unCompleted
            data.resultExam =  r
            resolve(data)
           
        }catch (e) {
            reject(e)
        }
    })
    
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData: updateUserData,
    getAllStudents: getAllStudents,
    updateStudentClass: updateStudentClass,
    getTeacher: getTeacher,
    getStudentWithExam:getStudentWithExam
}