// ============================================================
// index.test.js — Testes de todas as operações CRUD
// Integrantes:
//   Reysson Medeiros Gomes de Brito
//   Pedro Lucas Cavalcante dos Santos
//   João Gabriel da Silva Gonzaga
//
// Como executar: node index.test.js
// ============================================================

const usuarioRepo   = require('./usuarioRepository');
const grupoRepo     = require('./grupoRepository');
const membroRepo    = require('./membroRepository');
const disciplinaRepo= require('./disciplinaRepository');
const sessaoRepo    = require('./sessaoEstudoRepository');
const forumRepo     = require('./forumRepository');
const desafioRepo   = require('./desafioRepository');
const db            = require('./conexao');

function log(secao, operacao, resultado) {
  console.log(`\n[${secao}] ${operacao}`);
  console.log(JSON.stringify(resultado, null, 2));
}

function separador(titulo) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`  ${titulo}`);
  console.log('='.repeat(50));
}

async function executarTestes() {
  try {

    separador('1. USUÁRIO');
    const userId1 = await usuarioRepo.criar({ nome: 'Reysson', nascimento: '2000-01-01', email: 'reysson@teste.com', senha: 'hash123' });
    log('USUARIO', 'criar → id', userId1);
    const userId2 = await usuarioRepo.criar({ nome: 'Pedro', nascimento: '2001-05-10', email: 'pedro@teste.com', senha: 'hash123' });
    log('USUARIO', 'criar → id', userId2);
    log('USUARIO', 'listarTodos', await usuarioRepo.listarTodos());
    log('USUARIO', 'buscarPorId', await usuarioRepo.buscarPorId(userId1));
    log('USUARIO', 'buscarPorEmail', await usuarioRepo.buscarPorEmail('pedro@teste.com'));
    log('USUARIO', 'atualizar', await usuarioRepo.atualizar(userId1, { nome: 'Reysson Atualizado', nascimento: '2000-01-01', foto: 'foto.png' }));

    separador('2. GRUPO');
    const { id: grupoId, codigo_convite } = await grupoRepo.criar({ nome: 'Galera da Zaga', descricao: 'Grupo de estudos', idcriador: userId1 });
    log('GRUPO', 'criar → id + código', { grupoId, codigo_convite });
    log('GRUPO', 'listarTodos', await grupoRepo.listarTodos());
    log('GRUPO', 'buscarPorCodigo', await grupoRepo.buscarPorCodigo(codigo_convite));
    log('GRUPO', 'listarPorUsuario', await grupoRepo.listarPorUsuario(userId1));
    log('GRUPO', 'atualizar', await grupoRepo.atualizar(grupoId, { nome: 'Galera da Zaga v2', descricao: 'Atualizado' }));

    separador('3. MEMBRO');
    const membroId = await membroRepo.adicionar({ idgrupo: grupoId, idmembro: userId2, cargo: 'membro' });
    log('MEMBRO', 'adicionar → id', membroId);
    log('MEMBRO', 'listarPorGrupo', await membroRepo.listarPorGrupo(grupoId));
    log('MEMBRO', 'atualizarCargo', await membroRepo.atualizarCargo(membroId, 'lider'));

    separador('4. DISCIPLINA');
    const discId = await disciplinaRepo.criar({ nome: 'Matemática', iduser: userId1 });
    log('DISCIPLINA', 'criar → id', discId);
    log('DISCIPLINA', 'listarPorUsuario', await disciplinaRepo.listarPorUsuario(userId1));
    log('DISCIPLINA', 'atualizar', await disciplinaRepo.atualizar(discId, { nome: 'Cálculo I' }));

    separador('5. SESSÃO DE ESTUDO');
    const sessaoId = await sessaoRepo.criar({ iduser: userId1, disciplina: discId, data: '2025-05-14', horainicio: '08:00:00', horatermino: '10:00:00', observacao: 'Estudei derivadas' });
    log('SESSAO', 'criar → id', sessaoId);
    log('SESSAO', 'listarPorUsuario', await sessaoRepo.listarPorUsuario(userId1));
    log('SESSAO', 'atualizar', await sessaoRepo.atualizar(sessaoId, { disciplina: discId, data: '2025-05-14', horainicio: '08:00:00', horatermino: '11:00:00', observacao: 'Atualizado' }));

    separador('6. FÓRUM');
    const postId = await forumRepo.criarPost({ idgrupo: grupoId, iduser: userId1, topico: 'Dúvida', mensagem: 'Como resolver integrais?' });
    log('FORUM', 'criarPost → id', postId);
    log('FORUM', 'listarPorGrupo', await forumRepo.listarPorGrupo(grupoId));
    log('FORUM', 'atualizarPost', await forumRepo.atualizarPost(postId, { topico: 'Dúvida editada', mensagem: 'Como resolver integrais duplas?' }));

    const comentarioId = await forumRepo.criarComentario({ idpost: postId, iduser: userId2, mensagem: 'Boa pergunta!' });
    log('FORUM', 'criarComentario → id', comentarioId);
    log('FORUM', 'listarComentarios', await forumRepo.listarComentariosPorPost(postId));
    log('FORUM', 'atualizarComentario', await forumRepo.atualizarComentario(comentarioId, { mensagem: 'Comentário editado' }));

    separador('7. DESAFIO');
    const desafioId = await desafioRepo.criar({ idgrupo: grupoId, titulo: 'Lista 1', mensagem: 'Resolver questões 1 a 10', prazodata: '2025-05-20' });
    log('DESAFIO', 'criar → id', desafioId);
    log('DESAFIO', 'listarPorGrupo', await desafioRepo.listarPorGrupo(grupoId));
    log('DESAFIO', 'atualizar', await desafioRepo.atualizar(desafioId, { titulo: 'Lista 1 atualizada', mensagem: 'Resolver questões 1 a 15', prazodata: '2025-05-25' }));
    log('DESAFIO', 'expirar', await desafioRepo.expirar(desafioId));

    separador('8. LIMPEZA — DELETE');
    await forumRepo.deletarComentario(comentarioId);
    log('DELETE', 'deletarComentario → ok', {});
    await forumRepo.deletarPost(postId);
    log('DELETE', 'deletarPost → ok', {});
    await desafioRepo.deletar(desafioId);
    log('DELETE', 'deletarDesafio → ok', {});
    await membroRepo.remover(membroId);
    log('DELETE', 'removerMembro → ok', {});
    await grupoRepo.deletar(grupoId);
    log('DELETE', 'deletarGrupo → ok', {});
    await sessaoRepo.deletar(sessaoId);
    log('DELETE', 'deletarSessao → ok', {});
    await disciplinaRepo.deletar(discId);
    log('DELETE', 'deletarDisciplina → ok', {});
    await usuarioRepo.deletar(userId1);
    await usuarioRepo.deletar(userId2);
    log('DELETE', 'deletarUsuarios → ok', {});

    separador('TODOS OS TESTES CONCLUÍDOS COM SUCESSO');

  } catch (err) {
    console.error('\n[ERRO]', err.message);
    console.error(err);
  } finally {
    await db.end();
  }
}

executarTestes();