import db from "../models/index"
import bcrypt from 'bcryptjs'
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
                    message: 'OK'
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
         
            let examId = data[0].examId
            let studentId = data[0].studentId
           
     
            let arr = []
            for (let i = 0; i < data.length; i++){
                let c = {
                id: data[i].questionId,
                ans: data[i].studentAnswer
                }
                 arr.push(c)
            }
 
            
            let test= await db.ExamAns.create({
               examId: 2,
               studentId: 2,
               ansList: arr
                })  
            
            
            let ans = await db.StudentAnswer.findAll({
                 where: {
                     examId: examId,
                     studentId: studentId
                 },
                 raw : false
             })
            
            let count = 0;
            
            for (let i = 0; i < ans.length; i++){
                
                if (ans[i].result == 0) {
                    count++
                }
            }
            
            resolve(count)  
        } catch (e) {
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
    saveExam :saveExam
}