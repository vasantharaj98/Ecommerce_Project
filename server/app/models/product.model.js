module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, unsigned: true },
      name: {type: Sequelize.STRING},
      description: {type: Sequelize.STRING(10000)},
      category: {type: Sequelize.INTEGER},
      subcategory: {type: Sequelize.INTEGER},
      unit: {type: Sequelize.STRING},
      capacity: {type: Sequelize.INTEGER},
      maxorderqty: {type: Sequelize.INTEGER},
      price: {type: Sequelize.INTEGER},
      stock: {type: Sequelize.INTEGER},
      discounttype: {type: Sequelize.STRING},
      discount: {type: Sequelize.INTEGER},
      taxtype: {type: Sequelize.STRING},
      tax: {type: Sequelize.INTEGER},
      active: {type: Sequelize.BOOLEAN},
      image: {type: Sequelize.STRING(1000)},
      tags:{type: Sequelize.JSON}
    },{
        tableName: 'product'
    });
  
    return Product;
};