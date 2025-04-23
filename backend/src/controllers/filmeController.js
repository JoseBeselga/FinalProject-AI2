const db = require('../models');
const Filme = db.Filme;

// Lista todos os filmes
exports.filme_list = async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.json(filmes);
  } catch (error) {
    console.error("Erro no filme_list:", error);
    res.status(500).json({ error: error.message });
  }
};

// Retorna um filme pelo ID
exports.filme_detail = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) return res.status(404).json({ error: "Filme não encontrado" });
    res.json(filme);
  } catch (error) {
    console.error("Erro no filme_detail:", error);
    res.status(500).json({ error: error.message });
  }
};

// Cria um novo filme
exports.filme_create = async (req, res) => {
  try {
    const { titulo, descricao, foto, genero } = req.body;
    const novoFilme = await Filme.create({ titulo, descricao, foto, genero });
    res.status(201).json(novoFilme);
  } catch (error) {
    console.error("Erro no filme_create:", error);
    res.status(500).json({ error: error.message });
  }
};

// Atualiza um filme existente
exports.filme_update = async (req, res) => {
  try {
    const { titulo, descricao, foto, genero } = req.body;
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) return res.status(404).json({ error: "Filme não encontrado" });
    await filme.update({ titulo, descricao, foto, genero });
    res.json(filme);
  } catch (error) {
    console.error("Erro no filme_update:", error);
    res.status(500).json({ error: error.message });
  }
};

// Remove um filme 
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
      const filme = await Filme.findByPk(id);
      if (!filme) {
        return res.status(404).json({ message: 'Filme não encontrado' });
      }
      await filme.destroy();
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir o filme', error });
    }
};
