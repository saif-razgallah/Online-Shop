const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const DB_URL =
// 'mongodb+srv://saif:cyrUpxekiOmDybiQ@cluster0.icsuz.mongodb.net/online-shop?retryWrites=true&w=majority'
'mongodb://localhost:27017/online-shop'

const userSchema = mongoose.Schema({
    username: String,
    email : String,
    password: String,
    isAdmin : {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user',userSchema)

exports.createNewUser = (username,email,password) => {

    //  check if email exists
    // yes ===> error
    // no ===> create new account

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email})
        }).then(user =>{
            if (user) {
                reject ('email is used'),
                mongoose.disconnect()
            }  
            else {
               return bcrypt.hash(password,10)
            }
        }).then(hashedPassword => {
            let user = new User({
                username : username,
                email : email,
                password : hashedPassword
            })
            return user.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve('user created')
        }).catch(err => {
            mongoose.disconnect(),
            reject(err)
        })
    })

}

exports.login = (email,password) => {

    // check for email
    // no ===> error
    // yes ===> check for password
    // no ===> error
    // yes ===> set session  

    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>User.findOne({email:email}))
        .then(user =>{
            if (!user) {
                mongoose.disconnect()
                reject('there is no user matches this email')
            }else{
                bcrypt.compare(password,user.password).then(same => {
                    if (!same) {
                        mongoose.disconnect()
                        reject('password is not correct')
                    }else{
                        mongoose.disconnect()
                        resolve({
                           id:  user._id,
                           isAdmin: user.isAdmin
                        })
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
        
    })
}








