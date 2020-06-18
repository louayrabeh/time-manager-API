const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer=require('nodemailer')

//login
router.post("/login", async (req, res) => {
  const { body } = req;

 
  var user2 = await user.findOne({ email: body.email });
  user2=user2._doc
  if (!user2)
    return res.status(400).json({success :false , msg :"Email doesn't exist !!"});

if ( !user2.confirmed) return res.status(401).json({success :false , msg :"Your account is not confirmed !!"});

  //Hash password
  const { password } = body;

  const validPass = await bcrypt.compare(password, user2.password);

  if (!validPass) {return (res.status(400).json({success:false ,error : "Password is incorrect"}));}
  
  jwt.sign(
    { id: user2._id, userRole: user2.userRole },
    process.env.SECRET_KEY,
    (err, token) => {
      res.status(200).json({ token: token , id : user2._id , userRole :user2.userRole });
    
    }
  );

});
// confirm user
router.get('/confirm/:id',async(req,res)=>{
  const {id}=req.params
  var user1 = await user.findOne({_id : id})
  user1=user1._doc
  if (!user1) return res.status(404).json({success:false , error : "User doesn't exist !!"})
  if (user1.confirmed) return res.status(400).json({success : true , error : "User is already confirmed !!"})
  
  const body={...user1 , confirmed : true}
  user.findByIdAndUpdate(id,body)
  .then(result=>res.status(200).json({success:true}))
  .catch(err=>console.log(err))
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
      service :"gmail",
      auth: {
        user: process.env.email, // generated ethereal user
        pass: process.env.password, // generated ethereal password
      },
    });
    let msg = {
      from: process.env.email, // sender address
      to: body.email, // list of receivers
      subject: "Confirmation de votre compte", // Subject line
      html:`<b>Votre compte a été confirmé</b>`, // html body
    }
    let info = await transporter.sendMail(msg , (err,info)=>{
        if(err)
        {
            console.log(err)
        }
        console.log(info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });




})
// register user
router.post("/register", async (req, res) => {
  const { body } = req;

  // check if user is already in database
  const emailExist = await user.findOne({ email: body.email });
  if (emailExist) return res.status(400).json({success : false ,error : "Email already exists"});

  //Hash password
  const { password } = body;
  const salt = await bcrypt.genSalt(10);

  const cryptoPass = await bcrypt.hash(password, salt);
  const obj = new user({ ...body, password: cryptoPass });
  const savedUser = await obj.save();
  if (obj.userRole.toLowerCase()==="manager") {


  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
      service :"gmail",
      auth: {
        user: process.env.email, // generated ethereal user
        pass: process.env.password, // generated ethereal password
      },
    });
    let msg = {
      from: process.env.email, // sender address
      to: body.email, // list of receivers
      subject: "Confirmation de votre compte", // Subject line
      html:`<b>Cliquez <a href="${process.env.ConfirmationLink}/${obj._id}">ici </a>pour confirmer votre compte</b>`, // html body
    }
    let info = await transporter.sendMail(msg , (err,info)=>{
        if(err)
        {
            console.log(err)
        }
        console.log(info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
    }
      return res.status(200).json({ success: true, id: obj._id });

  
});
module.exports = router;
