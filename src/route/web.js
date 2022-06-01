import express from "express";
import homeController from "../controllers/homecontroller";
import userController from "../controllers/userController"

let router = express.Router();

let initWebRoutes = (app) => {
    //get data
    router.get('/Home',homeController.getHomePage);
    router.get('/about',homeController.getAboutPage);
    router.get('/Crud',homeController.getCRUD);

    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    
    router.post('/api/login', userController.hendleLogin);
    router.get('/api/get-user', userController.hendleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    
    //get data start page
    router.get('/',(req,res)=>{
        return res.send(" Start")
    } );
  

    return app.use("/", router);
}

module.exports = initWebRoutes;