module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      phone: {
        type: Sequelize.STRING(1000)
      },
      phoneOtp: {
        type: Sequelize.STRING
      }
    },{
        tableName: 'customer'
    });
  
    return Customer;
  };