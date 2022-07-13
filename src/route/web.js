import express from "express";
import { handle } from "express/lib/application";
import homeController from "../controllers/homecontroller";
import userController from "../controllers/userController"
import examController from "../controllers/examController"
import classController from "../controllers/classController";
import questionController from "../controllers/questionController"

let router = express.Router();

let initWebRoutes = (app) => {
    //get data
    router.get('/Home',homeController.getHomePage);
    router.get('/about',homeController.getAboutPage);
    router.get('/Crud',homeController.getCRUD);
    // test
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    //user
    router.post('/api/login', userController.hendleLogin);
    router.get('/api/get-user', userController.hendleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/get-student', userController.handleGetAllStudent)
    router.put('/api/edit-student-class', userController.handleEditStudentClass);

    //exam
    router.get('/api/get-exam', examController.handleGetExams)
    router.put('/api/edit-exam', examController.handleEditExam);
    router.delete('/api/delete-exam', examController.handleDeleteExam);
    router.post('/api/create-new-exam', examController.handleCreateNewExam);
    router.get('/api/get-point', examController.handleGetExamPoint);
    router.get('/api/get-answer', examController.handleGetAnswer)
    router.put('/api/edit-student-answer', examController.handleEditStudentAnswer);
    router.put('/api/save-exam', examController.handleSaveExam);
    router.get('/api/get-exam-ans', examController.handleGetExamAns)
 
    
    //question
    router.get('/api/get-question', questionController.handleGetQuestions)
    router.get('/api/get-question-for-teacher', questionController.handleGetQuestionsForTeacher)
    router.put('/api/edit-question', questionController.handleEditQuestion);
    //router.delete('/api/delete-exam', examController.handleDeleteExam);
    router.post('/api/create-new-question', questionController.handleCreateNewQuestion)


    // classes
    router.get('/api/get-class', classController.handleGetClasses)
    
    //get data start page
    router.get('/',(req,res)=>{
        return res.send(" Start")
    } );
  

    return app.use("/", router);
}

module.exports = initWebRoutes;