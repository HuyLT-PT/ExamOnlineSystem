import questionSevice from '../services/questionSevice'

let handleGetQuestions = async (req, res) => {
    
        let id = req.query.id 

 
   if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        questionsList : []
    }) 
    }   
    
    let questionsList = await questionSevice.getAllQuestionFromExam(id)
        
        return res.status(200).json({
        errCode: 0 ,
        errMessage: 'get questions successfully',
        questionsList 
    })
}
let handleCreateNewQuestion  = async (req, res) => {
    let message = await examSevice.createNewQuestion(req.body)
    return res.status(200).json(message)
}
let handleEditQuestion = async(req, res) => {
    let data = req.body
    let message = await questionSevice.updateQuestionData(data)
    return res.status(200).json(message)
 }  
module.exports = {
    handleGetQuestions: handleGetQuestions,
    handleCreateNewQuestion: handleCreateNewQuestion,
    handleEditQuestion : handleEditQuestion
}