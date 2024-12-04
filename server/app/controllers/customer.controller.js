const db = require("../models");
const config = require("../config/auth.config");
const { customer: Customer, cusrefreshToken: CusRefreshToken } = db;
const { generateOTP, fast2sms } = require("../../utils/otp.utils");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.loginsignupcustomer = (req, res) => {
  // Save User to Database
  Customer.findOne({
    where: {
        phone: req.body.phone
    }
  })
  .then(async customer => {
    const otp = generateOTP(4);
    if(customer){
      await Customer.update({
        phoneOtp: otp
      },{
        where: {phone: req.body.phone}
      })
      .then(async result => {
        console.log(result);
        res.status(200).json({
            status: 'success', message:"Customer Login Successfully", data: {
                phone: req.body.phone,
                phoneOtp: otp
            }
        })
        // await fast2sms(
        //     {
        //       message: otp,
        //       contactNumber: req.body.phone,
        //     }
        //  );
      })  
    }
    else{
        await Customer.create({
            phone: req.body.phone,
            phoneOtp: otp
        })
        .then(async result => {
            res.status(201).json({
                status: 'success', message:"Customer Registered Successfully", data: {
                    phone: result.phone,
                    phoneOtp: result.phoneOtp
                }
            });
            // await fast2sms(
            //     {
            //       message: otp,
            //       contactNumber: req.body.phone,
            //     }
            //  );
        })
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.verifyPhoneOtp = async (req, res) => {
    try {
        const {phoneOtp, phone} = req.body;
        Customer.findOne({where: {phone: phone}})
        .then(async customer => {
            console.log(customer);
           if( !customer){
            return res.status(400).json({
                status: 'failure', message:"Customer Not Found", data: null
            })
           } 
           if(customer.phoneOtp !== phoneOtp){
            return res.status(400).json({
                status: 'failure', message:"Incorrect OTP", data: null
            })
           }
           const token = jwt.sign({ id: customer.id },
            config.secret,
            {
              expiresIn: config.jwtExpiration,
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

            try {
              let refreshToken = await CusRefreshToken.createToken(customer);
              console.log(refreshToken);

              Customer.update({
                 phoneOtp: ""
               },{
                 where: {phone: req.body.phone}
               })
 
             res.status(200).send({
                 status:'success', message: 'OTP Verified Successfully', data: {
                     customer_id: customer.id,
                     accessToken: token,
                     refreshToken: refreshToken
                 }
               })

            } catch (err) {
              res.status(500).send({ message: err.message });  
            }
        })
    } catch (err) {
            res.status(500).send({ message: err.message });  
    }
}