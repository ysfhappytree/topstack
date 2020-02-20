module.exports = app =>{
    const express = require("express")

    const jwt = require("jsonwebtoken")
    const AdminUser = require("../../models/AdminUser")
    const assert = require('http-assert') 

    const MenuList = require('../../plugins/MenuList.json')

    const authMiddleware = require("../../middleware/auth")
    const resourceMiddleware = require("../../middleware/resource")
    const router = express.Router({
      mergeParams:true
      // 开启子路由继承
    })
    /*
      通用CRUD接口，resource动态接收前端发送的请求 /rest/类型
      中间处理函数使用inflection对接收到的请求名进行处理，classify将复数/小写名称转换为单数/大写 类名格式
      将处理完的类名与通用模型路径进行拼接取得对应的模型路径，挂在到req.Model下，便于后续接口的使用
    */
    app.use("/admin/api/rest/:resource",authMiddleware(),resourceMiddleware(),router)
    /*
      post为例，收到Category请求后，中间处理函数取得对应模型路径，获取对应模型，再调用模型的方法进行新增
    */ 
    /* 增 */  
    router.post("/",async (req,res) => {
      const model = await req.Model.create(req.body)
      res.send(model)
    })
    /* 改 */  
    router.put("/:id",async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
      })
    /* 查 列表 */  
    router.get("/",async (req,res) => {
        // 类型为分类时，才进行populate查找
        let items
        switch(req.Model.modelName){
          case "Category":
            items = await req.Model.find().populate("parent").limit(100)
            break;
          default:
            items = await req.Model.find().limit(100)
            break;
        }
        res.send(items)
      })
    /* 查 指定 */  
    router.get("/:id",async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    }) 
    /* 删除接口 */  
    router.delete("/:id",async (req,res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            message:"删除成功"
        })
      })
    
    /*
      上传接口
    */
    const multer = require('multer')
    const imageStorage = multer.diskStorage({
      destination:function(req,file,cb){
        cb(null,__dirname + "/../../uploads/images")
      },
      filename:function(req,file,cb){
        let changeName = (new Date().getTime()) + '-' + file.originalname
        cb(null,changeName)
      }
    })
    const upload = multer({storage:imageStorage})
    app.post("/admin/api/upload",authMiddleware(),upload.single("file"),async(req,res)=>{
      const file = req.file
      console.log(file)
      file.url = `http://localhost:3000/uploads/images/${file.filename}`
      res.send(file)
    })
    /*
      登陆接口
    */ 
    app.post("/admin/api/login",async (req,res)=>{
      const {username,password} = req.body
      // 找用户
      const user = await AdminUser.findOne({username}).select('+password')
      assert(user,422,"用户不存在")
      // 校验密码
      const isValid = require("bcrypt").compareSync(password,user.password)
      assert(isValid,422,"密码错误")
      // 返回token
      const token =jwt.sign({id:user._id,_id:user._id},app.get("secret"))
      res.send({token,username:user.username,MenuList})
    }),
    
    /*
      错误处理函数
    */
    app.use(async (err,req,res,next)=>{
      res.status(err.statusCode || 500).send({
        message:err.message
      })
    })
}