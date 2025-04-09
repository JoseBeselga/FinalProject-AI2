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
      }
    }, {
      tableName: 'generos',
      timestamps: false
    });
  };
  