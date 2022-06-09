import db from "../models/index"
import bcrypt from 'bcryptjs'
import { reject } from "bcrypt/promises"
const salt = bcrypt.genSaltSync(10);
 
let getAllClasses = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let classes = ''
            if (id === 'ALL') {
                classes = await db.ClassIn4.findAll({
                    
                })
            }
            
            if (id && id !== 'ALL') {
                classes = db.ClassIn4.findOne({
                    where: { id: id } ,
                    
                }) 
            }

            resolve(classes)
           
        }catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllClasses: getAllClasses,
}