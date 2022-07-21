import examService from "../services/examService"
import { encode, decode } from 'node-base64-image';
import e from "cors";
import path from "path";
import db from "../models";
const fs = require('fs');

var multiparty = require('multiparty');
let handleGetExams =async(req,res) => {
    let id = req.query.id 
    let userId = req.query.userId
    let status = req.query.status
    if (status!="DONE") {status = null}
    if (userId) {
       
        let data = await examService.getExamForUser(userId, status)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'get exam for student ok',
            data
        })
    } else {
    
        let exams = await examService.getAllExams(id)

        return res.status(200).json({
            errCode: 0,
            errMessage: 'get Exam successfully',
            data: exams
        })
    }
}

let handleDeleteExam = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing require'
        })
    }
    let message = await examService.deleteExam(req.body.id)
    return res.status(200).json(message)
}
let handleEditExam = async(req,res) => {
    let data =req.body 
    let message =await examService.updateExamData(data)
    return res.status(200).json(message)
}
let handleCreateNewExam  = async (req, res) => {
    let message = await examService.createNewExam(req.body)
    return res.status(200).json(message)
}
let handleGetExamPoint = async (req, res) => {
    let data = req.query.id
    
    let message = await examService.getExamPoint(data)
    return res.status(200).json(message)
}
let handleEditStudentAnswer = async (req, res) => {
    let data = req.body
    //console.log(data)
    let message = await examService.saveAnswer(data)
    return res.status(200).json(message)
}
let handleGetAnswer = async (req, res) => {
    let data = req.query.id
    //console.log(data)
    let message = await examService.getAnswer(data)
    return res.status(200).json(message)
}
let handleSaveExam = async (req, res) => {
    let data = req.body // 
    console.log(data)
    let message = await examService.saveExam(data)

    return res.status(200).json(message) 
}
let handleGetExamAns = async (req, res) => {
    let studentId = req.query.studentId
    let  examId = req.query.examId
 
  
    
    let data = await examService.getAllExamAns(studentId,examId)
    if (data === null) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'no Exam with this examId ',
            
        })
    } else {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'get Exam successfully',
            data
       
        })
    }
}
let handleUploadImg = async (req, res) => {
    let form = new multiparty.Form();
    let studentId = req.query.studentId
    let examId = req.query.examId
  
    form.parse(req ,function (err, fields, files) {  
        if(err){ 
                throw err; 
        } else {
          //  let studentId = fields.studentId[0]
          //  let examId = fields.examId[0]
            
            let oldpath = files.image[0].path
            console.log('dcu may  la ok ngay di')
            let newPath =`D:/NodeJs/src/public/student${studentId}_examId${examId}.jpg`
            fs.rename(oldpath, newPath, () => { })
                db.ExamAns.create({
                    examId: examId,
                    studentId: studentId,
                    img: newPath ,
            
                })  
            
           // examService.uploadImgForExam(examId, studentId, newPath)
     
            
            return res.status(200).json({
                errCode: 200,
                errMessage: 'upload img successfully',

            })
         }  
    }) 

    /*let data = await examService.uploadImgForExam(req)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'upload img successfully',
       data 
    }) */
}
module.exports = {
    handleGetExams: handleGetExams,
    handleDeleteExam: handleDeleteExam,
    handleEditExam: handleEditExam,
    handleCreateNewExam: handleCreateNewExam,
    handleGetExamPoint: handleGetExamPoint,
    handleEditStudentAnswer: handleEditStudentAnswer,
    handleGetAnswer: handleGetAnswer,
    handleSaveExam: handleSaveExam,
    handleGetExamAns: handleGetExamAns,
    handleUploadImg:handleUploadImg

}