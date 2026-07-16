// ============================================================
// forumRepository.js
// ============================================================

const db = require('./conexao');

const forumRepository = {

  async criarPost({ idgrupo, iduser, topico, mensagem }) {
    const [result] = await db.execute(
      'INSERT INTO Forum (idgrupo, iduser, topico, mensagem) VALUES (?, ?, ?, ?)',
      [idgrupo, iduser, topico, mensagem]
    );
    return result.insertId;
  },

  async listarPorGrupo(idgrupo) {
    const [rows] = await db.execute(
      `SELECT f.*, u.nome AS autor_nome
       FROM Forum f
       JOIN Usuario u ON f.iduser = u.iduser
       WHERE f.idgrupo = ?
       ORDER BY f.data DESC`,
      [idgrupo]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM Forum WHERE idpost = ?',
      [id]
    );
    return rows[0] || null;
  },

  async atualizarPost(id, { topico, mensagem }) {
    const [result] = await db.execute(
      'UPDATE Forum SET topico = ?, mensagem = ? WHERE idpost = ?',
      [topico, mensagem, id]
    );
    return result.affectedRows;
  },

  async deletarPost(id) {
    const [result] = await db.execute(
      'DELETE FROM Forum WHERE idpost = ?',
      [id]
    );
    return result.affectedRows;
  },

  async criarComentario({ idpost, iduser, mensagem }) {
    const [result] = await db.execute(
      'INSERT INTO Comentarios (idpost, iduser, mensagem) VALUES (?, ?, ?)',
      [idpost, iduser, mensagem]
    );
    return result.insertId;
  },

  async listarComentariosPorPost(idpost) {
    const [rows] = await db.execute(
      `SELECT c.*, u.nome AS autor_nome
       FROM Comentarios c
       JOIN Usuario u ON c.iduser = u.iduser
       WHERE c.idpost = ?
       ORDER BY c.data ASC`,
      [idpost]
    );
    return rows;
  },

  async buscarComentarioPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM Comentarios WHERE idcomentario = ?',
      [id]
    );
    return rows[0] || null;
  },

  async atualizarComentario(id, { mensagem }) {
    const [result] = await db.execute(
      'UPDATE Comentarios SET mensagem = ? WHERE idcomentario = ?',
      [mensagem, id]
    );
    return result.affectedRows;
  },

  async deletarComentario(id) {
    const [result] = await db.execute(
      'DELETE FROM Comentarios WHERE idcomentario = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = forumRepository;