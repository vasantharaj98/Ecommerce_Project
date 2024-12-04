module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, unsigned: true },
      customer_id: {type: Sequelize.INTEGER},
      product_id: {type: Sequelize.INTEGER},
      qty: {type: Sequelize.INTEGER},
      price: {type: Sequelize.INTEGER},
      total_price: {type: Sequelize.INTEGER},
    },{
        tableName: 'cart'
    });
  
    return Cart;
};