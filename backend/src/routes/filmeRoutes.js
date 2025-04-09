const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');

// Rota para retornar todos os filmes
router.get('/list', filmeController.filme_list);
// Rota para retornar um filme por ID
router.get('/get/:id', filmeController.filme_detail);
// Rota para criar um filme
router.post('/create', filmeController.filme_create);
// Rota para atualizar um filme pelo ID
router.put('/update/:id', filmeController.filme_update);
// Rota para deletar um filme (opcional)
router.delete('/delete/:id', filmeController.filme_delete);

module.exports = router;
