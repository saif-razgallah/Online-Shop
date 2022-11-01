const mongoose = require('mongoose')
const DB_URL = 
//'mongodb+srv://saif:cyrUpxekiOmDybiQ@cluster0.icsuz.mongodb.net/online-shop?retryWrites=true&w=majority'
'mongodb://localhost:27017/online-shop'


const productSchema = mongoose.Schema({
    name : String,
    image : String,
    price : Number ,
    description: String,
    category : String

})

const Product = mongoose.model('product',productSchema)

exports.getAllProducts = () => {
    // connect to database
    // get products
    // disconnect

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
            return Product.find({})
        }).then(products =>{
            mongoose.disconnect()
            resolve(products)
            }).catch(err => reject(err))
    })

}

exports.getProductsByCategory = (category) => {
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
            return Product.find({category : category})
        }).then(products =>{
            mongoose.disconnect()
            resolve(products)
            }).catch(err => reject(err))
    })

}


exports.getProductsById = (id) => {
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
            return Product.findById(id)
        }).then(product =>{
            mongoose.disconnect()
            resolve(product)
            }).catch(err => reject(err))
    })

}

exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let newProduct = new Product(data);
                return newProduct.save();
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};