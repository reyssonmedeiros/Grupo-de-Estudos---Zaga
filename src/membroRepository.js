// ============================================================
// membroRepository.js
// ============================================================

const db = require('./conexao');

const membroRepository = {

  async adicionar({ idgrupo, idmembro, cargo = 'membro' }) {
    const [result] = await db.execute(
      'INSERT INTO Membro (idgrupo, idmembro, cargo) VALUES (?, ?, ?)',
      [idgrupo, idmembro, cargo]
    );
    return result.insertId;
  },

  async listarPorGrupo(idgrupo) {
    const [rows] = await db.execute(
      `SELECT m.*, u.nome, u.email, u.foto
       FROM Membro m
       JOIN Usuario u ON m.idmembro = u.iduser
       WHERE m.idgrupo = ?`,
      [idgrupo]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM Membro WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async atualizarCargo(id, cargo) {
    const [result] = await db.execute(
      'UPDATE Membro SET cargo = ? WHERE id = ?',
      [cargo, id]
    );
    return result.affectedRows;
  },

  async remover(id) {
    const [result] = await db.execute(
      'DELETE FROM Membro WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = membroRepository;