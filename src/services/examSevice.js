import db from "../models/index"
import bcrypt from 'bcryptjs'
import { reject } from "bcrypt/promises"
const salt = bcrypt.genSaltSync(10);

let getAllExams = (examId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let exams = ''
            if (examId === 'ALL') {
                exams = await db.Exam.findAll({
                    
                })
            }
            
            if (examId && examId !== 'ALL') {
                exams = db.Exam.findOne({
                    where: { id: examId } ,
                    
                }) 
            }

            resolve(exams)
           
        }catch (e) {
            reject(e)
        }
    })
}

let deleteExam = (id) => {
    return new Promise(async (resolve, reject) => {
        let exam = await db.Exam.findOne({
            where : { id:id}
        })

        if (!exam) {
            resolve({
                errCode: 2,
                errMessage: 'exam isnt exist'
            })
        }

        await db.Exam.destroy({
             where : { id:id}
        })

        resolve({
            errCode: 0,
            errMessage: 'Exam deleted'
        })
    })
}
let updateExamData = (data) => {
    return new Promise(async(resolve, reject) => {

        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage :' missing id'
                })
            }
             let exam= await db.Exam.findOne({
                 where: { id: data.id } ,
                 raw : false
            })
            if (exam) {
                exam.time = data.time
                exam.impClass = data.impClass

                await exam.save()
                resolve({
                    errCode: 0,
                    message: 'Exam updated'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage : ' not found this exam'
                })
            }
        } catch (e) {
            reject(ejs)
        }
    })
}
let createNewExam = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
                await db.Exam.create({
                    name: data.name,
                    subject: data.subject,
                    time: data.time,
                    numberOfQuestion: data.numberOfQuestion,         
                    impClass: data.impClass
                })

                resolve({
                    errCode: 0,
                    message: 'Created successfully'
                });
            
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllExams: getAllExams,
    deleteExam: deleteExam,
    updateExamData: updateExamData,
    createNewExam : createNewExam
}