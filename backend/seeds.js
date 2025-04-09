// seed.js
const db = require('./src/models');
const { Genero, Filme } = db;

async function seed() {
  try {
    // Sincroniza o banco de dados, forçando a recriação das tabelas (ATENÇÃO: Esse comando apagará os dados existentes)
    await db.sequelize.sync({ force: true });
    console.log("Banco de dados sincronizado e tabelas recriadas!");

    // Cria alguns gêneros (ex.: Drama, Comédia, Ação e Romance)
    const generos = await Promise.all([
      Genero.create({ descricao: 'Drama' }),
      Genero.create({ descricao: 'Comédia' }),
      Genero.create({ descricao: 'Ação' }),
      Genero.create({ descricao: 'Romance' })
    ]);
    console.log("Gêneros criados com sucesso!");

    // Cria alguns filmes associados aos gêneros acima
    await Promise.all([
      Filme.create({
        titulo: 'Filme 1',
        descricao: 'Descrição do filme 1',
        foto: 'filme1.jpg',
        genero: generos[0].id  // Associa ao gênero Drama
      }),
      Filme.create({
        titulo: 'Filme 2',
        descricao: 'Descrição do filme 2',
        foto: 'filme2.jpg',
        genero: generos[1].id  // Associa ao gênero Comédia
      }),
      Filme.create({
        titulo: 'Filme 3',
        descricao: 'Descrição do filme 3',
        foto: 'filme3.jpg',
        genero: generos[2].id  // Associa ao gênero Ação
      }),
      Filme.create({
        titulo: 'Filme 4',
        descricao: 'Descrição do filme 4',
        foto: 'filme4.jpg',
        genero: generos[3].id  // Associa ao gênero Romance
      })
    ]);
    console.log("Filmes criados com sucesso!");

    console.log("Seed finalizado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao realizar o seed:", error);
    process.exit(1);
  }
}

seed();
