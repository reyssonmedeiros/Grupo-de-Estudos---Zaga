// ============================================================
// disciplinaRepository.js
// ============================================================

const db = require('./conexao');

const disciplinaRepository = {

  async criar({ nome, iduser }) {
    const [result] = await db.execute(
      'INSERT INTO Disciplina (nome, iduser) VALUES (?, ?)',
      [nome, iduser]
    );
    return result.insertId;
  },

  async listarPorUsuario(iduser) {
    const [rows] = await db.execute(
      'SELECT * FROM Disciplina WHERE iduser = ? ORDER BY nome',
      [iduser]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM Disciplina WHERE iddisciplina = ?',
      [id]
    );
    return rows[0] || null;
  },

  async atualizar(id, { nome }) {
    const [result] = await db.execute(
      'UPDATE Disciplina SET nome = ? WHERE iddisciplina = ?',
      [nome, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.execute(
      'DELETE FROM Disciplina WHERE iddisciplina = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = disciplinaRepository;