const { authJwt } = require("../middleware");
const {multerMiddleware} = require("../middleware")
const controller = require("../controllers/subcategory.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/product/subcategory",
    [authJwt.verifyToken],
    controller.getSubCategory
  );

  app.post(
    "/api/product/subcategory",
    [authJwt.verifyToken, multerMiddleware],
    controller.addSubCategory
  );

  
  app.put(
    "/api/product/subcategory/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.updateSubCategory
  );

  app.delete(
    "/api/product/subcategory/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.deleteSubCategory
  );

};