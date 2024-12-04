require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

  function initial() {
    Role.create({
      id: 1,
      name: "admin"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "user"
    });
  }

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ecommerce application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/subcategory.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/banner.routes')(app);
require('./app/routes/cart.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});