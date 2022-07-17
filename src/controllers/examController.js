import examService from "../services/examService"
import {encode, decode} from 'node-base64-image';
let handleGetExams =async(req,res) => {
    let id = req.query.id 

 
   if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        exams : []
    }) 
    }   
    
    let exams = await examService.getAllExams(id)

        return res.status(200).json({
        errCode: 0 ,
        errMessage: 'get Exam successfully',
        exams
    })
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
    let data = req.body // mutilpath query multer
    //console.log(data)
     let message = await examService.saveExam(data)
    return res.status(200).json(message) // true answer
}
let handleGetExamAns = async (req, res) => {
   let id = req.query.id 

 
   if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        data : []
    }) 
    }   
    
    let data = await examService.getAllExamAns(id)
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
    let input = req.body
    
    console.log(input)
    let data = await examService.uploadImgForExam(input)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'upload img successfully',
        data
    })
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