module.exports = option =>{
    return async (req,res,next)=>{
        /* 获取模型 */
        const modelName = require("inflection").classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
      }
}