module.exports = (sequelize, DataTypes) => {
    return sequelize.define('genero', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    }, {
      tableName: 'generos',
      timestamps: false
    });
  };