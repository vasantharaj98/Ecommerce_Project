const { authJwt, multerMiddleware } = require("../middleware");
const {multimulterMiddleware} = require("../middleware")
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/product",
    [authJwt.verifyToken],
    controller.getPost
  );

  app.get(
    "/api/customer/product",
    controller.getPost
  );

  app.get(
    "/api/customer/product/subcategory",
    controller.getPostBySubcategory
  );

  app.get(
    "/api/customer/product/:id",
    controller.getPostById
  );

  app.post(
    "/api/product",
    [authJwt.verifyToken, multerMiddleware],
    controller.addPost
  );

  app.put(
    "/api/product/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.updatePost
  );

  app.delete(
    "/api/product/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.deletePost
  );

};