const express=require('express')
const app=express()
require('dotenv').config()
const helmet=require('helmet')
const morgan=require('morgan')
require('./config/mongoose')



app.use('/api',require('./routes'))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


const port=process.env.PORT
app.listen(port,(err)=>{
    if(err) console.log(`error in listening at port`)
    console.log(`server is running at port ${port}`)
})
