import db from "../models/index"
import bcrypt, { compareSync } from 'bcryptjs'
import { encode, decode } from 'node-base64-image';
import * as Base64_Blob from 'base64-blob'
var path = require('path');
const salt = bcrypt.genSaltSync(10);

let getAllExams = (classId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let exams = ''
            let classes = ''
            let className =''
            if (classId === 'ALL') {
                exams = await db.Exam.findAll({
                    
                })
            }
            
            
            if (classId && classId !== 'ALL') {
                classes = await db.ClassIn4.findOne({
                    where: {
                        id : classId 
                    }
                })
                className = classes.name 
                exams = db.Exam.findAll({
                    where: {
                       impClass: className
                    }
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
                if (data.status === 'NOT DONE') {
                    exam.status = null
                } else {
                    exam.status = 'DONE'
                }
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
            reject(e)
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
let checkPoint = (data) => {
    return new Promise(async(resolve, reject) => {

        try {

            let questions = await db.Questions.findAll({
                where: {
                    examId : data.examId
                }
            })
            let check = 1; 
            if (data.studentAnswer == questions.key) {
                check = 0;
               
            } else {
                check = 1;
            }
            await db.StudentAnswer.create({
                studentId: data.studentId ,
                examId: data.examId,
                subject: data.subject,
                sbd: data.sbd,
                questionId: data.questionId,
                studentAnswer: data.studentAnswer,
                result : check
            })
            resolve({
                    errCode: 0,
                    message: 'OK',
                    
                });
        } catch (e) {
            reject(e)
        }
    })
}
let getExamPoint = (examId) => {
    // std id , exam id 
    return new Promise(async(resolve, reject) => {

        try {
           
             let ans = await db.StudentAnswer.findAll({
                 where: {
                     examId: examId,
                     studentId: 2
                 },
                 raw : false
             })
            
            let count = 0;
            
            for (let i = 0; i < ans.length; i++){
                
                if (ans[i].result == 0) {
                    count++
                }
            }
        //   console.log (ans[0])
            let arr = []
            for (let i = 0; i < ans.length; i++){
                let c = {
                id: ans[i].questionId,
                ans: ans[i].studentAnswer
                }
                 arr.push(c)
            }

        
           
          //  let test= await db.ExamAnswer.findAll()
           //   console.log(test)
              //  console.log(arr)
             /*  await db.ExamAnswer.create({
                    examId:  examId,
                    studentId: 2,
                    answerList: arr,
                    note : 'ok'
                }) */
            
        

            resolve(count)
        } catch (e) {
            reject(e)
        }
    })
}
let saveAnswer = (data) => {
   return new Promise(async(resolve, reject) => {
 
        try {
            let questions = await db.Questions.findAll({
                where: {
                    id : data.id,
                    examId : data.examId
                }
            })
            let check = 1; 
     
            let ans = questions[0].key
   
            if (data.key === ans) {  //data.key is student answer
                check = 0;
               
            } else {
                check = 1;
            }
            let checkans = await db.StudentAnswer.findOne({
                where: {
                    questionId: data.id,
                    studentId: 2,
                    examId: data.examId
                },
                raw:false
            })

            if (checkans) {
                checkans.studentAnswer = data.key
                checkans.result = check
                await checkans.save()
                resolve({
                    errCode: 0,
                    message: 'ans updated'
                })
            } else {
                
                await db.StudentAnswer.create({
                    studentId: 2,
                    examId: data.examId,
                    subject: 'English',
                    sbd: 150001,
                    questionId: data.id,
                    studentAnswer: data.key,
                    result: check
                })
                    resolve({
                    errCode: 0,
                    message: 'ans created',
                    check 
                }); 

            } 
   
        } catch (e) {
            reject(e)
        }
    }) 
}
let getAnswer = (examId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let ans = '' 

            ans = await db.StudentAnswer.findAll({
                attributes: ['studentAnswer','questionId','studentId','examId'],
                 where: {
                     examId: examId,
                     studentId: 2
                 },
                 raw : false
             })
            

            resolve(ans)
           
        }catch (e) {
            reject(e)
        }
    })
}
let saveExam = (data) => {
    return new Promise(async(resolve, reject) => {

        try {     
          
            let examId = 2 //data.examId
            let studentId = 2 //data.studentId
            let studentAns = data.data
     
            let arr = []  // id = qId ans = stdans
            let ansList = []
            let c = []
     
            let count = 0;
            // get Ans List
            for (let i = 0; i < studentAns.length; i++) {
                c = {
                    questionId: studentAns[i].questionId,
                    studentAnswer: studentAns[i].studentAnswer,
                    key : ''
                }
                arr.push(c)
                let questionInfoFromDb = await db.Questions.findAll({
                    where: {
                    id : arr[i].questionId,
                    examId :examId
                        }
                        
                 })
                arr[i].key = questionInfoFromDb[0].key
                ansList.push(questionInfoFromDb[0].key)
             
         
            }
       
           // add data to ExamAns
              
         
            // add data to student Ans for check point
           
            for (let i = 0; i < arr.length; i++){
                
                // check db 
                let old = await db.StudentAnswer.findOne({
                 where: {
                        examId: examId,
                        studentId: studentId,
                        questionId: arr[i].questionId
                   },
                    
               
                raw : false
                })            
                 // check-point
                let check = 1; 

                if (arr[i].studentAnswer===ansList[i]) {
                    check = 0
                    count ++
               } else {
                   check =1
                }
                if (old) {
               
                // update
                    old.studentAnswer = arr[i].studentAnswer
                    old.result = check
         
                    await  old.save()
                } else {
                    //create
                        console.log('create')
         //         await db.StudentAnswer.create({
          //              examId: examId,
          //              studentId: studentId,
          //              questionId: arr[i].id,
           //             studentAnswer: arr[i].ans,
           //             result : check
          //          })
        //        }
                    }
                
            }
             await db.ExamAns.create({
                examId: examId,
                studentId: studentId,
                 ansList: arr,
                 result : count + '/' + arr.length
                
                 })  
           
   
         resolve('submit success with point')  
        } catch (e) {
            reject(e)
        }
    })
}
let getAllExamAns = (studentId, examId) => {
     return new Promise(async(resolve, reject) => {
        try {
            let exams = ''
            exams = await db.ExamAns.findAll({
                    attributes: ['examId','studentId','ansList','result'],

                    where: {
                        examId: examId,
                        studentId: studentId
                        
                    }
            }) 
            
            let examInfo = await db.Exam.findOne({
                where: {
                   id : examId
               }
            }) 
            exams[0].name = examInfo.name
            exams[0].time = examInfo.time
            exams[0].subject = examInfo.subject

            console.log(exams[0])
            resolve(exams)
           
        }catch (e) {
            reject(e)
        }
    })
}
let uploadImgForExam = (examId,studentId,path) => {
     return new Promise(async(resolve, reject) => {
         try {
             
            
            // fake input = data.image
       /* let url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnG5KPZl_R5gj1nwITIHEOJIrsBfc4_NUEqQ&usqp=CAU';
            let options = {
                string: true,
                headers: {
                    "User-Agent": "my-app"
            }
            }; */

           // let img = await encode(url, options);
          
             
            /*let img = data
            const b64 = img.toString('base64');
                

             await decode(b64, { fname: `./src/example/Exam_${data.examId}_Student_${data.studentId}`, ext: 'jpg' });
            console.log(b64) */
         //   let p = path.dirname(`./src/example/Exam_${examId}_Student_${studentId}.jpg`); 
          //  let q = path.basename(`./src/example/Exam_${examId}_Student_${studentId}.jpg`) 
            
            await db.ExamAns.create({
                examId: examId,
                studentId: studentId,
                img: path ,
        
            })  
            // test file
          /*  let test=  await db.ExamAns.findOne({
                examId: data.examId,
                studentId: data.studentId,
                
            })
            console.log(test.note) 

            let r = path.basename(test.note) */
             //console.log(r)
           // let blob =  Buffer.from(img);
            // let blob =  Base64_Blob.base64ToBlob(img)
           // my.ini -> max_allowed_package
             
            // save to storage

            // await decode(img, { fname: '../photo', ext: 'jpg' });
            
            // save link to db    
        }catch (e) {
            reject(e)
        }
    })   
}
let getExamForUser = (userId, status) => {
     return new Promise(async(resolve, reject) => {
        try {
            let exams = ''
            let user = await db.User.findOne({
                where: {
                    id : userId
                }
            })
          
            exams = await db.Exam.findAll({
                where: {
                    impClass: user.class,
                    status : status
                 }
             })
            resolve(exams)
           
        }catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllExams: getAllExams,
    deleteExam: deleteExam,
    updateExamData: updateExamData,
    createNewExam: createNewExam,
    checkPoint: checkPoint,
    getExamPoint: getExamPoint,
    saveAnswer: saveAnswer,
    getAnswer: getAnswer,
    saveExam: saveExam,
    getAllExamAns: getAllExamAns,
    uploadImgForExam: uploadImgForExam,
    getExamForUser:getExamForUser
}