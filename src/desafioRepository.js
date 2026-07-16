// ============================================================
// desafioRepository.js
// ============================================================

const db = require('./conexao');

const desafioRepository = {

  async criar({ idgrupo, titulo, mensagem, prazodata }) {
    const [result] = await db.execute(
      'INSERT INTO Desafios (idgrupo, titulo, mensagem, prazodata) VALUES (?, ?, ?, ?)',
      [idgrupo, titulo, mensagem, prazodata]
    );
    return result.insertId;
  },

  async listarPorGrupo(idgrupo) {
    const [rows] = await db.execute(
      'SELECT * FROM Desafios WHERE idgrupo = ? ORDER BY prazodata ASC',
      [idgrupo]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM Desafios WHERE iddesafio = ?',
      [id]
    );
    return rows[0] || null;
  },

  async atualizar(id, { titulo, mensagem, prazodata }) {
    const [result] = await db.execute(
      'UPDATE Desafios SET titulo = ?, mensagem = ?, prazodata = ? WHERE iddesafio = ?',
      [titulo, mensagem, prazodata, id]
    );
    return result.affectedRows;
  },

  async expirar(id) {
    const [result] = await db.execute(
      "UPDATE Desafios SET status = 'expirado' WHERE iddesafio = ?",
      [id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.execute(
      'DELETE FROM Desafios WHERE iddesafio = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = desafioRepository;