document.getElementById('nome').addEventListener('blur', () => {
    validarCampoObrigatorio("nome", "nomeErro", "Digite seu nome");
});
document.getElementById('nome').addEventListener('input', () => {
    validarCampoObrigatorio("nome", "nomeErro", "Digite seu nome");
});

document.getElementById('email').addEventListener('blur', () => {
    validarEmail("email", "emailErro", "Digite um email válido");
});
document.getElementById('email').addEventListener('input', () => {
    validarEmail("email", "emailErro", "Digite um email válido");
});

document.getElementById('senha').addEventListener('input', () => {
    senhaForte("senha", "senhaSugestao");
});

const form = document.getElementById('formCadastro');
if (form) {
    form.addEventListener('submit', (evento) => {
        const nomeValido = validarCampoObrigatorio("nome", "nomeErro", "Digite seu nome");
        const emailValido = validarEmail("email", "emailErro", "Digite um email válido");
        const senhaValida = senhaForte("senha", "senhaSugestao");

        if (!nomeValido || !emailValido || !senhaValida) {
            evento.preventDefault();
        }
    });
}

function validarCampoObrigatorio(nomeCampo, msgCampo, msgErro) {
    const campo = document.getElementById(nomeCampo);
    const erro = document.getElementById(msgCampo);

    erro.innerText = "";

    if (campo.value.trim() === "") {
        erro.innerText = msgErro;
        return false;
    }

    return true;
}

function validarEmail(nomeCampo, msgCampo, msgErro) {
    const campo = document.getElementById(nomeCampo);
    const email = campo.value.trim();
    const erro = document.getElementById(msgCampo);

    erro.innerText = "";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        erro.innerText = msgErro;
        return false;
    }

    return true;
}

function senhaForte(nomeCampo, msgSugestaoSenha) {
    const senha = document.getElementById(nomeCampo).value;
    const sugestao = document.getElementById(msgSugestaoSenha);

    if (senha.length === 0) {
        sugestao.innerText = "";
        return false;
    }

    let erros = [];

    if (senha.length < 8)
        erros.push("mínimo 8 caracteres");

    if (!/[A-Z]/.test(senha))
        erros.push("uma letra maiúscula");

    if (!/[a-z]/.test(senha))
        erros.push("uma letra minúscula");

    if (!/[0-9]/.test(senha))
        erros.push("um número");

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha))
        erros.push("um caractere especial");

    if (erros.length > 0) {
        sugestao.innerText = "A senha precisa conter: " + erros.join(", ");
        return false;
    }

    sugestao.innerText = "Senha forte";
    return true;
}