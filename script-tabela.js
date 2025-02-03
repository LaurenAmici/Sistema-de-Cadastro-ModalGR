const dados = JSON.parse(localStorage.getItem("dadosCadastro"));

if (dados) {
    const tabela = document.getElementById("tabelaCadastro");
    const linha = tabela.insertRow();

    Object.values(dados).forEach(valor => {
        const celula = linha.insertCell();
        celula.textContent = valor;
    });
}
else {
    document.body.innerHTML += "<p>Nenhum dado cadastrado.</p>";
}