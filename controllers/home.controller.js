const productsModel = require ('../models/products.model')


exports.getHome = (req,res,next) => {
    
    // get category
    // if category && category !=all
    //          filter
    // else
    //  render all

    let category = req.query.category
    let validCategories = ['computers', 'clothes','phones']
    if (category && validCategories.includes(category)) {
        productsModel.getProductsByCategory(category).then(products => {
            res.render('index',{
                products: products,
                isUser: req.session.userId,
                validationError: req.flash('validationErrors')[0],
                isAdmin: req.session.isAdmin,
                pageTitle: 'Home'
            })
        })
    } else {

    //get products
    //render index.ejs

    productsModel.getAllProducts().then(products => {
        res.render('index',{
            products: products,
            isUser : req.session.userId,
            validationError: req.flash('validationErrors')[0],
            isAdmin: req.session.isAdmin,
            pageTitle: 'Home'
        })
    })
    }

}