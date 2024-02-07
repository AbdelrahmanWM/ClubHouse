const User = require('../models/user');
const bcrypt =require('bcryptjs');
const {body,validationResult} = require('express-validator');
exports.user_sign_up_get = function (req, res, next) {
  res.render("sign_up");
};
exports.user_sign_up_post=[
    body('first_name')
    .trim()
    .isLength({min:3})
    .withMessage("First name must be at least 3 characters long.")
    .isAlpha()
    .withMessage("First name cannot contain numbers of special characters.")
    .escape(),
    body('last_name')
    .trim()
    .isLength({min:3})
    .withMessage("Last name must be at least 3 characters long.")
    .isAlpha()
    .withMessage("Last name cannot contain numbers of special characters.")
    .escape(),
    body('username')
    .trim()
    .isLength({min:3})
    .withMessage("username must be at least 3 characters long.")
    .escape(),
    body('password')
    .trim()
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters.")
    .escape(),
    body('confirm_password')
    .custom((value,{req})=>{
        return value === req.body.password;
    })
    .withMessage("Please make sure your passwords match.")
    .escape(),

    async function(req,res,next){
       const errors = validationResult(req);
       const user=new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        username:req.body.username,
        password:req.body.password,

       })
       if(!errors.isEmpty()){
        res.render('sign_up',{
           user:user,
           errors:errors.array()
        })
        return;
       }
       else{
        const userExists =await User.findOne({username:req.body.username}).exec();
         if(userExists){
            res.render('sign_up',{
                user:user,
                errors:[{msg:"This username already exists."}]
            })
            return;
         }
         bcrypt.hash(req.body.password,10,async(err,hashPassword)=>{
            if(err){
               return next(err);
            }
            user.password=hashPassword;
            await user.save();
            
            res.redirect('/');
          }
         )
       }

}
]