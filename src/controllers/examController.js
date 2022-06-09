import examService from "../services/examService"

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
module.exports = {
    handleGetExams: handleGetExams,
    handleDeleteExam: handleDeleteExam,
    handleEditExam: handleEditExam,
    handleCreateNewExam:handleCreateNewExam
}