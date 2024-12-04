const { verifySignUp } = require("../middleware");
const controller = require("../controllers/customer.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/customer/signuplogin",
    controller.loginsignupcustomer
  );

  app.post(
    "/api/customer/verifyotp",
    controller.verifyPhoneOtp
  );

  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};