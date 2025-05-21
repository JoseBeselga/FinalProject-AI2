const db = require('../models');
const Genero = db.Genero;

// Lista todos os gêneros
exports.genero_list = async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.json(generos);
  } catch (error) {
    console.error("Erro no genero_list:", error);
    res.status(500).json({ error: error.message });
  }
};

// Retorna um gênero pelo ID
exports.genero_detail = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ error: "Gênero não encontrado" });
    res.json(genero);
  } catch (error) {
    console.error("Erro no genero_detail:", error);
    res.status(500).json({ error: error.message });
  }
};

// Cria um novo gênero
exports.genero_create = async (req, res) => {
  try {
    const { descricao } = req.body;
    const generoExistente = await Genero.findOne({ where: { descricao } });
    if (generoExistente) {
      return res.status(400).json({ error: "Já existe um gênero com essa descrição" });
    }
    const novoGenero = await Genero.create({ descricao });
    res.status(201).json(novoGenero);
  } catch (error) {
    console.error("Erro no genero_create:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Já existe um gênero com essa descrição" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Atualiza um gênero existente
exports.genero_update = async (req, res) => {
  try {
    const { descricao } = req.body;
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ error: "Gênero não encontrado" });
    await genero.update({ descricao });
    res.json(genero);
  } catch (error) {
    console.error("Erro no genero_update:", error);
    res.status(500).json({ error: error.message });
  }
};

// Deleta um gênero
exports.genero_delete = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ error: "Gênero não encontrado" });
    await genero.destroy();
    res.json({ message: "Gênero deletado com sucesso" });
  } catch (error) {
    console.error("Erro no genero_delete:", error);
    res.status(500).json({ error: error.message });
  }
};
