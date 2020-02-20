const express = require("express")
const app = express()


app.set("secret","TOKEN_KEY")

app.use(express.json())
app.use(require("cors")())
app.use("/uploads",express.static(__dirname + '/uploads'))
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})

require("./routes/admin")(app)
require("./routes/web")(app)
require("./plugins/db")(app)

