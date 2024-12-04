module.exports = (sequelize, Sequelize) => {
    const SubCategory = sequelize.define("subcategory", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, unsigned: true },
      category_id: { type: Sequelize.INTEGER},
      name: {type: Sequelize.STRING},
      image: {type: Sequelize.STRING(1000)}
    },{
        tableName: 'subcategory'
    });
  
    return SubCategory;
};