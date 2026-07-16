// ============================================================
// grupoRepository.js
// ============================================================

const db = require('./conexao');

function gerarCodigo() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

const grupoRepository = {

  async criar({ nome, descricao = null, idcriador }) {
    const codigo_convite = gerarCodigo();
    const [result] = await db.execute(
      'INSERT INTO Grupo (nome, descricao, idcriador, codigo_convite, data_criacao) VALUES (?, ?, ?, ?, CURRENT_DATE)',
      [nome, descricao, idcriador, codigo_convite]
    );
    // Insere o criador como líder
    await db.execute(
      'INSERT INTO Membro (idgrupo, idmembro, cargo) VALUES (?, ?, ?)',
      [result.insertId, idcriador, 'lider']
    );
    return { id: result.insertId, codigo_convite };
  },

  async listarTodos() {
    const [rows] = await db.execute(
      `SELECT g.*, u.nome AS criador_nome
       FROM Grupo g
       JOIN Usuario u ON g.idcriador = u.iduser
       ORDER BY g.data_criacao DESC`
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT * FROM Grupo WHERE idgrupo = ?',
      [id]
    );
    return rows[0] || null;
  },

  async buscarPorCodigo(codigo) {
    const [rows] = await db.execute(
      'SELECT * FROM Grupo WHERE codigo_convite = ?',
      [codigo]
    );
    return rows[0] || null;
  },

  async listarPorUsuario(iduser) {
    const [rows] = await db.execute(
      `SELECT g.* FROM Grupo g
       JOIN Membro m ON g.idgrupo = m.idgrupo
       WHERE m.idmembro = ?`,
      [iduser]
    );
    return rows;
  },

  async atualizar(id, { nome, descricao }) {
    const [result] = await db.execute(
      'UPDATE Grupo SET nome = ?, descricao = ? WHERE idgrupo = ?',
      [nome, descricao, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.execute(
      'DELETE FROM Grupo WHERE idgrupo = ?',
      [id]
    );
    return result.affectedRows;
  },

};

module.exports = grupoRepository;