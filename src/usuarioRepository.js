// ============================================================
// usuarioRepository.js
// ============================================================

const db = require('./conexao');

const usuarioRepository = {

  async criar({ nome, nascimento, email, senha, foto = null }) {
    const [result] = await db.execute(
      'INSERT INTO Usuario (nome, nascimento, email, senha, foto) VALUES (?, ?, ?, ?, ?)',
      [nome, nascimento, email, senha, foto]
    );
    return result.insertId;
  },

  async listarTodos() {
    const [rows] = await db.execute(
      'SELECT iduser, nome, nascimento, email, foto FROM Usuario'
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT iduser, nome, nascimento, email, foto FROM Usuario WHERE iduser = ?',
      [id]
    );
    return rows[0] || null;
  },

  async buscarPorEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM Usuario WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  async atualizar(id, { nome, nascimento, foto }) {
    const [result] = await db.execute(
      'UPDATE Usuario SET nome = ?, nascimento = ?, foto = ? WHERE iduser = ?',
      [nome, nascimento, foto, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.execute(
      'DELETE FROM Usuario WHERE iduser = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = usuarioRepository;