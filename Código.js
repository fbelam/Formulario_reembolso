function doGet() {
  return HtmlService.createHtmlOutputFromFile('Formulario');
}

// Processa o formulário de dados simples (nome, datas, etc.)
function processarFormulario(dados) {

  Logger.log("🚀 Dados recebidos:");
  Logger.log(JSON.stringify(dados, null, 2));

  const planilha = SpreadsheetApp.openById("1xtoZVnFBdAgp39E7pmAUyIOy3uQJ7CY0Tp24Cuw32E4");
  let aba = planilha.getSheetByName("Reembolsos");

  // Se a aba não existir, crie e adicione cabeçalhos
  if (!aba) {
    aba = planilha.insertSheet("Reembolsos");
    aba.appendRow([
      "Data envio", "Cliente", "Técnico", "Data Saída", "Data Retorno",
      "Alimentação", "Mercado", "Combustível", "Táxi", "Estacionamento", "Outros",
      "Soma Geral", "Link Nota", "Status"
    ]);
  }

  Logger.log(JSON.stringify(dados, null, 2)); // Verifica o conteúdo que chegou

  const novaLinha = [
    new Date(),
    dados.cliente || "",
    dados.tecnico || "",
    dados.data_saida || "",
    dados.data_retorno || "",
    dados["Alimentação"] || "0.00",
    dados["Mercado"] || "0.00",
    dados["Combustivel"] || "0.00",
    dados["Taxi"] || "0.00",
    dados["Estacionamento"] || "0.00",
    dados["Outros"] || "0.00",
    dados.soma_geral || "0.00",
    "",
    "Pendente"
  ];

  aba.appendRow(novaLinha);

  return `Obrigado, ${dados.cliente || 'usuário'}! Seus dados foram salvos com sucesso.`;
}

// Recebe arquivo como Base64 e salva no Drive
function uploadBase64File(dados) {
  try {
    const folderId = "1kXOYIcm0rRmfhabyye0AYsrNEHehE2gP"; // sua pasta
    const folder = DriveApp.getFolderById(folderId);

    const decoded = Utilities.base64Decode(dados.conteudo);
    const blob = Utilities.newBlob(decoded, dados.tipo, dados.nome);
    const file = folder.createFile(blob);

    return "Arquivo enviado com sucesso: " + file.getName();
  } catch (e) {
    return "Erro ao enviar o arquivo: " + e.toString();
  }
}
