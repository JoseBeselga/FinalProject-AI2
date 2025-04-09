const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

// Cria a instância do Sequelize com as configurações
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
);

// Importa os modelos após a criação da instância
const Filme = require('./filme')(sequelize, DataTypes);
const Genero = require('./genero')(sequelize, DataTypes);

// Configura as associações entre os modelos utilizando um alias para evitar colisões
Filme.belongsTo(Genero, { foreignKey: 'genero', as: 'generoInfo' });
Genero.hasMany(Filme, { foreignKey: 'genero', as: 'filmes' });

// Exporta a instância do Sequelize e os modelos para serem utilizados nos controladores
module.exports = {
  sequelize,
  Sequelize,
  Filme,
  Genero
};
