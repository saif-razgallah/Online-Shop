//only one function then on use module.exports direct
module.exports =(req,res,next) => {
    if(req.session.isAdmin) next()
    else res.redirect('/not-admin')
}