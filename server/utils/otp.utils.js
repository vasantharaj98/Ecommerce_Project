
var unirest = require("unirest");

var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
const {FAST2SMS} = require("../app/config/otp.config");

exports.generateOTP = (otp_length) => {
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < otp_length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  
exports.fast2sms = async ({ message, contactNumber }, next) => {
    req.headers({
        "authorization": FAST2SMS
      });
      
      req.form({
        "variables_values": message,
        "route": "otp",
        "numbers": contactNumber,
      });
      
      req.end(function (res) {
        if (res.error) throw new Error(res.error);
      
        console.log(res.body);
      });
      
  };