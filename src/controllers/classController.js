import db from '../models'
import classService from '../services/classService'
import userService from '../services/userService';
import examService from '../services/examService';
let handleGetClasses = async (req, res) => {
    let id = req.query.id 

 
   if (!id) {
       return res.status(500).json({
        errCode: 1 ,
        errMessage: 'Missing id',
        classes : []
    }) 
    }   
    
    let classes = await classService.getAllClasses(id)
    let teacher = await userService.getTeacher()
    let students = await userService.getAllStudents(id)
    let exams  = await examService.getAllExams(id)
        return res.status(200).json({
        errCode: 0 ,
        errMessage: 'get class successfully',
            classes,
            teacher,
            students,
            exams
    })
}
module.exports = {
    handleGetClasses : handleGetClasses ,
}