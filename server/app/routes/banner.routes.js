const { authJwt } = require("../middleware");
const {multerMiddleware} = require("../middleware")
const controller = require("../controllers/banner.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/banner",
    [authJwt.verifyToken],
    controller.getBanner
  );

  app.get(
    "/api/customer/banner",
    controller.getBanner
  );

  app.post(
    "/api/banner",
    [authJwt.verifyToken, multerMiddleware],
    controller.addBanner
  );

  app.put(
    "/api/banner/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.updateBanner
  );

  app.delete(
    "/api/banner/:id",
    [authJwt.verifyToken, multerMiddleware],
    controller.deleteBanner
  );

};