if (document.getElementById('nome')) {
    document.getElementById('nome').addEventListener('blur', () => {
        validarCampoObrigatorio("nome", "nomeErro", "Digite seu nome");
    });
    document.getElementById('nome').addEventListener('input', () => {
        validarCampoObrigatorio("nome", "nomeErro", "Digite seu nome");
    });
}

if (document.getElementById('email')) {
    document.getElementById('email').addEventListener('blur', () => {
        validarEmail("email", "emailErro", "Digite um email válido");
    });
    document.getElementById('email').addEventListener('input', () => {
        validarEmail("email", "emailErro", "Digite um email válido");
    });
}

if (document.getElementById('senha')) {
    document.getElementById('senha').addEventListener('input', () => {
        senhaForte("senha", "senhaSugestao");
    });
}

if (document.getElementById('dataNascimento')) {
    document.getElementById('dataNascimento').addEventListener('blur', () => {
        validarDataNascimento("dataNascimento", "dataNascimentoErro");
    });
}

const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (evento) => {
        const nomeValido = validarCampoObrigatorio("nome", "nomeErro", "Digite seu nome");
        const emailValido = validarEmail("email", "emailErro", "Digite um email válido");
        const senhaValida = senhaForte("senha", "senhaSugestao");
        const dataValida = validarDataNascimento("dataNascimento", "dataNascimentoErro");

        if (!nomeValido || !emailValido || !senhaValida || !dataValida) {
            evento.preventDefault();
        }
    });
}

function validarDataNascimento(nomeCampo, msgCampo) {
    const campo = document.getElementById(nomeCampo);
    const erro = document.getElementById(msgCampo);

    erro.innerText = "";

    if (campo.value === "") {
        erro.innerText = "Digite sua data de nascimento";
        return false;
    }

    const dataNascimento = new Date(campo.value);
    const hoje = new Date();

    if (dataNascimento > hoje) {
        erro.innerText = "A data não pode ser no futuro";
        return false;
    }

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const aindaNaoFezAniversarioEsteAno =
        hoje.getMonth() < dataNascimento.getMonth() ||
        (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate());

    if (aindaNaoFezAniversarioEsteAno) {
        idade--;
    }

    if (idade < 13) {
        erro.innerText = "Você precisa ter pelo menos 13 anos";
        return false;
    }

    return true;
}

if (document.getElementById('loginEmail')) {
    document.getElementById('loginEmail').addEventListener('blur', () => {
        validarEmail("loginEmail", "loginEmailErro", "Digite um email válido");
    });
}

if (document.getElementById('loginSenha')) {
    document.getElementById('loginSenha').addEventListener('blur', () => {
        validarCampoObrigatorio("loginSenha", "loginSenhaErro", "Digite sua senha");
    });
}

const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', (evento) => {
        const emailValido = validarEmail("loginEmail", "loginEmailErro", "Digite um email válido");
        const senhaValida = validarCampoObrigatorio("loginSenha", "loginSenhaErro", "Digite sua senha");

        if (!emailValido || !senhaValida) {
            evento.preventDefault();
        }
    });
}

if (document.getElementById('comentario')) {
    document.getElementById('comentario').addEventListener('blur', () => {
        validarCampoObrigatorio("comentario", "comentarioErro", "Escreva um comentário antes de enviar");
    });
}

const formResposta = document.getElementById('formResposta');
if (formResposta) {
    formResposta.addEventListener('submit', (evento) => {
        const comentarioValido = validarCampoObrigatorio("comentario", "comentarioErro", "Escreva um comentário antes de enviar");

        if (!comentarioValido) {
            evento.preventDefault();
        }
    });
}