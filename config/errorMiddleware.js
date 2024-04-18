module.exports.error=function(req,res,next){
    const error=new Error(`Not Found -${req.originalUrl}
    `)
    res.stack(404)
    next(error)
}


module.exports.errorStatus= function(err,req,res,next){
    const statusCode=res.statusCode===200?500:res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='production'?null:err.stack

    })
    next()
}

