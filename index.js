document.getElementById("consultar-btn").addEventListener("click", async () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, ""); // Remove caracteres não numéricos
  const resultado = document.getElementById("resultado");

  if (cep.length !== 8) {
    resultado.innerHTML =
      '<p style="color: red;">Por favor, digite um CEP válido com 8 dígitos.</p>';
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      resultado.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
    } else {
      resultado.innerHTML = `
                <strong>CEP:</strong> ${data.cep}<br>
                <strong>Endereço:</strong> ${data.logradouro}<br>
                <strong>Bairro:</strong> ${data.bairro}<br>
                <strong>Cidade:</strong> ${data.localidade}<br>
                <strong>Estado:</strong> ${data.uf}<br>
            `;
    }
  } catch (error) {
    resultado.innerHTML =
      '<p style="color: red;">Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.</p>';
    console.error("Erro na consulta de CEP:", error);
  }
});
