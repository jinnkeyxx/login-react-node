const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const passport = require ('passport')
const passportLocal = require ('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require ('bcryptjs')
const expressSesion = require ('express-session')
const bodyParse = require ('body-parser')
const app = express()
mongoose.connect('mongodb://localhost:27017/test') , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
},() => {
    console.log("data connect");
}
const User = require('./user')
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended : true}))
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
app.use(expressSesion({
    secret : "secretcode",
    resave : true,
    saveUninittialized : true
}))
app.post("/login" , (request , response) => {
    console.log(request.body);
    User.findOne({username : request.body.username , password : request.body.password} , async (err , doc) =>{
        if(err) throw err
        if(!doc){
            const newUser = new User({
                username : request.body.username,
                password : request.body.password,
            })
            await newUser.save()
        }
    })
    // response.send(request.body)
})
app.use(cookieParser('secretcode'))
app.listen(80 , () => {
    console.log('run 80');
})