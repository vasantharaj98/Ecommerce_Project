const { authJwt } = require("../middleware");
const controller = require("../controllers/cart.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/customer/cart",
    [authJwt.verifyToken],
    controller.getCartByCustomer
  );

  app.post(
    "/api/customer/cart",
    [authJwt.verifyToken],
    controller.addCart
  );

  app.put(
    "/api/customer/cart/:id",
    [authJwt.verifyToken],
    controller.updateCart
  );

  app.delete(
    "/api/customer/cart/:id",
    [authJwt.verifyToken],
    controller.deleteCart
  );

};