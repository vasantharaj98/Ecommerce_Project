module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define("banner", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true, unsigned: true },
      attribute: {type: Sequelize.INTEGER},
      image: {type: Sequelize.STRING(1000)}
    },{
        tableName: 'banner'
    });
  
    return Banner;
};