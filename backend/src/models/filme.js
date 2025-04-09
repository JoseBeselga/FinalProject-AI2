module.exports = (sequelize, DataTypes) => {
    return sequelize.define('filme', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Armazena o id do género (foreign key)
      genero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      tableName: 'filmes',
      timestamps: false
    });
  };
  