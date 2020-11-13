const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult


exports.getCart = (req,res,next) => {
    cartModel.getItemsByUser(req.session.userId).then((items)=>{
        res.render('cart',{
            pageTitle: "Cart",
            items: items,
            isUser: true,
            validationError: req.flash('validationErrors')[0],
            isAdmin : req.session.isAdmin
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.postCart = (req,res,next) => {
    if(validationResult(req).isEmpty())
    {
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect('/cart')
        }).catch(err=>{
            console.log(err)
        })
    } else {
        res.redirect(req.body.redirectTo)
    }
}

exports.postsave = (req,res,next) => {
    if(validationResult(req).isEmpty())
    {   
        cartModel.editItem(req.body.cartId,{
            amount: req.body.amount,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect('/cart')
        }).catch(err=> console.log(err))

    } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.postdelete =(req,res,next) => {
    cartModel.deleteItem(req.body.cartId)
    .then(()=> res.redirect('/cart'))
    .catch(err => console.log(err))
}