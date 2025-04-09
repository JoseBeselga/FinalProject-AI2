const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

// Rota para retornar todos os gêneros
router.get('/list', generoController.genero_list);
// Rota para retornar um gênero pelo ID
router.get('/get/:id', generoController.genero_detail);
// Rota para criar um novo gênero
router.post('/create', generoController.genero_create);
// Rota para atualizar um gênero pelo ID
router.put('/update/:id', generoController.genero_update);
// Rota para deletar um gênero
router.delete('/delete/:id', generoController.genero_delete);

module.exports = router;
