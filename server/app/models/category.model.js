module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, unsigned: true },
      name: {type: Sequelize.STRING},
      image: {type: Sequelize.STRING(1000)}
    },{
        tableName: 'category'
    });
  
    return Category;
};