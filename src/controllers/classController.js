import classService from '../services/classService'

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

        return res.status(200).json({
        errCode: 0 ,
        errMessage: 'get class successfully',
        classes
    })
}
module.exports = {
    handleGetClasses : handleGetClasses ,
}