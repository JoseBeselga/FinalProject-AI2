const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const app = express();
const port = config.port;

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importação das rotas
const filmeRoutes = require('./routes/filmeRoutes');
const generoRoutes = require('./routes/generoRoutes');

// Configuração das rotas
app.use('/filmes', filmeRoutes);
app.use('/generos', generoRoutes);

// Middleware básico para tratar erros não capturados
app.use((err, req, res, next) => {
  console.error("Erro geral:", err);
  res.status(500).send('Erro interno do servidor');
});

// Sincroniza a base de dados e inicia o servidor
const db = require('./models');
db.sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar com o banco:", err);
  });