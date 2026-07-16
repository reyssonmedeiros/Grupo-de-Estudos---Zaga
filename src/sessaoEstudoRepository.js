// ============================================================
// sessaoEstudoRepository.js
// ============================================================

const db = require('./conexao');

const sessaoEstudoRepository = {

  async criar({ iduser, disciplina, data, horainicio, horatermino, observacao = null }) {
    const [result] = await db.execute(
      'INSERT INTO SessaoEstudo (iduser, disciplina, data, horainicio, horatermino, observacao) VALUES (?, ?, ?, ?, ?, ?)',
      [iduser, disciplina, data, horainicio, horatermino, observacao]
    );
    return result.insertId;
  },

  async listarPorUsuario(iduser) {
    const [rows] = await db.execute(
      `SELECT s.*, d.nome AS disciplina_nome
       FROM SessaoEstudo s
       JOIN Disciplina d ON s.disciplina = d.iddisciplina
       WHERE s.iduser = ?
       ORDER BY s.data DESC`,
      [iduser]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM SessaoEstudo WHERE idsessao = ?',
      [id]
    );
    return rows[0] || null;
  },

  async atualizar(id, { disciplina, data, horainicio, horatermino, observacao }) {
    const [result] = await db.execute(
      'UPDATE SessaoEstudo SET disciplina = ?, data = ?, horainicio = ?, horatermino = ?, observacao = ? WHERE idsessao = ?',
      [disciplina, data, horainicio, horatermino, observacao, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.execute(
      'DELETE FROM SessaoEstudo WHERE idsessao = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = sessaoEstudoRepository;