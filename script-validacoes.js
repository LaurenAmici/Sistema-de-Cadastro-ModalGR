//------------------------------------------------------------VALIDAÇÃO CAMPO NOME

function validacaoNome() {
    const nome = document.getElementById('nome').value;
    const erro = document.getElementById('erro-nome');

    if (nome === "") {
        erro.textContent = "Campo obrigatório";
        return false;
    } else {
        erro.textContent = "";
        return true;
    }
}

//------------------------------------------------------------VALIDAÇÃO CAMPO CPF

//---------------Formatação do CPF
 function formatarCPF(cpfInput) {
    let cpf = cpfInput.value.replace(/\D/g, ""); //Remove caracteres não numéricos
            
    if (cpf.length > 11)
    {   cpf = cpf.substring(0, 11); }
            
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            
    cpfInput.value = cpf;
}

//---------------Validação do CPF
function validacaoCPF() {
    const cpfInput = document.getElementById("cpf");
    const cpf = cpfInput.value.replace(/\D/g, "");
    const erro = document.getElementById("erro-cpf");

    if (cpf === "") {
        erro.textContent = "Campo obrigatório";
        return false;
    }
    
    if (cpf.length !== 11 || !validarDigitosCPF(cpf)) {
        erro.textContent = "CPF inválido";
        return false;
    }

    erro.textContent = "";
    return true;
}

//---------------Verificação do CPF
function validarDigitosCPF(cpf) {
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;

    //Primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    //Segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

//------------------------------------------------------------VALIDAÇÃO CAMPO DATA DE NASCIMENTO

function validacaoData() {
    const data = document.getElementById('dataNascimento').value;
    const erro = document.getElementById('erro-data');

    const dataNascimento = new Date(data);
    const hoje = new Date();

    if (dataNascimento >= hoje) {
        erro.textContent = "Data de nascimento inválida";
        return false;
    }

    erro.textContent = "";
    return true;
}

//------------------------------------------------------------VALIDAÇÃO CAMPO EMAIL

function validacaoEmail() {
    const email = document.getElementById('email').value;
    const erro = document.getElementById('erro-email');

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
        erro.textContent = "Campo obrigatório";
        return false;
    } else if (!regex.test(email)) {
        erro.textContent = "E-mail inválido";
        return false;
    } else {
        erro.textContent = "";
        return true;
    }
}

//------------------------------------------------------------VALIDAÇÃO CAMPO CEP

//---------------Formatação do CEP
function formatarCEP(cepInput) {
    let cep = cepInput.value.replace(/\D/g, ""); //Remove caracteres não numéricos
        
    if (cep.length > 5) 
    {   cep = cep.replace(/(\d{5})(\d{1,3})$/, "$1-$2"); }

    cepInput.value = cep;
}

//---------------Validação do CEP
function validacaoCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, ""); //Remove traço para validação
    const erro = document.getElementById('erro-cep');

    if (cep === "") {
        erro.textContent = "Campo obrigatório";
        return false;
    }
    
    if (cep.length !== 8) {
        erro.textContent = "O CEP deve conter 8 dígitos numéricos";
        return false;
    }

    erro.textContent = "";
    consultarCEP(cep);
    return true;
}

//---------------Consulta do CEP API ViaCEP
function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('erro-cep').textContent = "CEP não encontrado";
                limparCamposEndereco();
            } else {
                document.getElementById('logradouro').value = data.logradouro || "";
                document.getElementById('bairro').value = data.bairro || "";
                document.getElementById('cidade').value = data.localidade || "";
                document.getElementById('estado').value = data.uf || "";
            }
        })
        .catch(() => {
            document.getElementById('erro-cep').textContent = "Erro ao buscar o CEP";
            limparCamposEndereco();
        });
}

function limparCamposEndereco() {
    document.getElementById('logradouro').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

//------------------------------------------------------------VALIDAÇÃO CAMPO NÚMERO

function validacaoNumero() {
    const numero = document.getElementById('numero').value;
    const erro = document.getElementById('erro-numero');
    
    if (numero === "") {
        erro.textContent = "Campo obrigatório";
        return false;
    } else {
        erro.textContent = "";
        return true;
    }
}

//------------------------------------------------------------VALIDAÇÃO DO FORMULÁRIO

function validacaoFormulario() {
    let valido = true;

    if (!validacaoNome()) valido = false;
    if (!validacaoCPF()) valido = false;
    if (!validacaoData()) valido = false;
    if (!validacaoEmail()) valido = false;
    if (!validacaoNumero()) valido = false;
    if (!validacaoCEP()) valido = false;

    return valido;
}

//------------------------------------------------------------CALCULO IDADE E ARMAZENAMENTO DOS DADOS

function calculoIdade (dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (hoje.getMonth() < nascimento.getMonth() || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate()) ) {
        idade=idade-1;
    }

    return idade;
}

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validacaoFormulario()) {
        return;
    }

    const dados = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        idade: calculoIdade(document.getElementById("dataNascimento").value),
        email: document.getElementById('email').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numero').value
    };

    localStorage.setItem("dadosCadastro", JSON.stringify(dados));

    window.location.href = "tabela-cadastro.html";
});

