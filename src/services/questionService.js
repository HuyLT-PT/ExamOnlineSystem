import db from "../models/index"
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

let getAllQuestionFromExam = (examId) => {
    return new Promise(async (resolve, reject) => {
        
        try {
            let questions = ''
           
            if (examId === 'ALL') {
                questions = await db.Questions.findAll({
                   attributes: ['id','examId','content','optionA','optionB','optionC','optionD'],
                })
            }
            if (examId && examId !== 'ALL') {
                questions = db.Questions.findAll({
                    attributes: ['id','examId','content','optionA','optionB','optionC','optionD'],
                    where: { examId: examId } ,
                }) 
            }

            resolve(questions)
           
        }catch (e) {
            reject(e)
        }
    })
}
let createNewQuestion = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
                await db.Questions.create({
                    examId: data.examId,
                    content:data.content,
                    optionA: data.optionA,
                    optionB: data.optionB,
                    optionC: data.optionC,
                    optionD: data.optionD,
                    key: data.key
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
let updateQuestionData = (data) => {
    return new Promise(async(resolve, reject) => {

        try {
            if (!data.id) {
                    await db.Questions.create({
                    examId: data.examId,
                    content:data.content,
                    optionA: data.optionA,
                    optionB: data.optionB,
                    optionC: data.optionC,
                    optionD: data.optionD,
                    key: data.key
                })
                resolve({
                    errCode: 0,
                    errMessage: ' created new question'
                    
                })
            }
            if (!data.examId) {
                resolve({
                    errCode: 2,
                    errMessage :' missing id exam'
                })
            }
             let question= await db.Questions.findOne({
                 where: {
                     id: data.id,
                     examId : data.examId
                 },
                 raw : false
            })
            if (question) {
                    question.content = data.content,
                    question.optionA = data.optionA,
                    question.optionB = data.optionB,
                    question.optionC = data.optionC,
                    question.optionD = data.optionD,
                    question.key = data.key
              

                await question.save()
                resolve({
                    errCode: 0,
                    message: 'Quesion updated',
                    question
                })
            } else {
                await db.Questions.create({
                    examId: data.examId,
                    content:data.content,
                    optionA: data.optionA,
                    optionB: data.optionB,
                    optionC: data.optionC,
                    optionD: data.optionD,
                    key: data.key
                })
                resolve({
                    errCode: 1,
                    errMessage: ' not found' ,
                    question 
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllQuestionForTeacher = (examId) => {
    return new Promise(async (resolve, reject) => {
        
        try {
            let questions = ''
           
            if (examId === 'ALL') {
                questions = await db.Questions.findAll({
                   
                })
            }
            if (examId && examId !== 'ALL') {
                questions = db.Questions.findAll({
                    where: { examId: examId } ,
                }) 
            }

            resolve(questions)
           
        }catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllQuestionFromExam: getAllQuestionFromExam,
    createNewQuestion: createNewQuestion,
    updateQuestionData: updateQuestionData,
    getAllQuestionForTeacher:getAllQuestionForTeacher
}