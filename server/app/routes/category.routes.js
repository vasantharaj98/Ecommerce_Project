const { authJwt } = require("../middleware");
const {multerMiddleware} = require("../middleware")
const controller = require("../controllers/category.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/product/category",
    [authJwt.verifyToken],
    controller.getCategory
  );

  app.get(
    "/api/customer/category",
    controller.getCategory
  );

  app.post(
    "/api/product/category",
    [authJwt.verifyToken, multerMiddleware],
    controller.addCategory
  );

  app.put(
    "/api/product/category/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.updateCategory
  );

  app.delete(
    "/api/product/category/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.deleteCategory
  );

};