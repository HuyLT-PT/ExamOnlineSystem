import questionService from '../services/questionService'

let handleGetQuestions = async (req, res) => {
    
        let id = req.query.id 

 
   if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        data : []
    }) 
    }   
    
    let questionsList = await questionService.getAllQuestionFromExam(id)
        
        return res.status(200).json({
        errCode: 0 ,
        errMessage: 'get questions successfully',
        data : questionsList 
    })
}
let handleCreateNewQuestion  = async (req, res) => {
    let message = await examService.createNewQuestion(req.body)
    return res.status(200).json(message)
}
let handleEditQuestion = async(req, res) => {
    let data = req.body
    let message = await questionService.updateQuestionData(data)
    return res.status(200).json(message)
}  
 let handleGetQuestionsForTeacher = async (req, res) => {
    
        let id = req.query.id 

 
   if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        data : []
    }) 
    }   
    
    let questionsList = await questionService.getAllQuestionForTeacher(id)
        
        return res.status(200).json({
        errCode: 0 ,
        errMessage: 'get questions successfully',
        data : questionsList 
    })
}
module.exports = {
    handleGetQuestions: handleGetQuestions,
    handleCreateNewQuestion: handleCreateNewQuestion,
    handleEditQuestion: handleEditQuestion,
    handleGetQuestionsForTeacher:handleGetQuestionsForTeacher
}