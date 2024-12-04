const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    timezone: config.timezone,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.banner = require("../models/banner.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.subcategory = require("../models/subcategory.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.cart = require("../models/cart.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
db.cusrefreshToken = require("../models/cusrefreshToken.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
  });
 
  db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
  });

  db.cusrefreshToken.belongsTo(db.customer, {
    foreignKey: 'customerId', targetKey: 'id'
  });
  
  db.customer.hasOne(db.cusrefreshToken, {
    foreignKey: 'customerId', targetKey: 'id'
  });

  db.ROLES = ["admin", "moderator", "user"];

module.exports = db;