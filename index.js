const express=require('express')
const app=express()
require('dotenv').config()
const helmet=require('helmet')
const morgan=require('morgan')
const errorHandler=require('./config/errorMiddleware')
require('./config/mongoose')


app.use(express.json())
app.use(express.urlencoded())
app.use('/api',require('./routes'))
app.use(errorHandler.error)
app.use(errorHandler.errorStatus)



app.use(helmet())
app.use(morgan("common"))


const port=process.env.PORT
app.listen(port,(err)=>{
    if(err) console.log(`error in listening at port`)
    console.log(`server is running at port ${port}`)
})
