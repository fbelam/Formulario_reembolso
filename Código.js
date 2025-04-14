function doGet() {
  return HtmlService.createHtmlOutputFromFile('Formulario');
}

// Processa o formulário de dados simples (nome, datas, etc.)
function processarFormulario(dados) {
  Logger.log(dados);  // Para visualização no log do Apps Script
  
  const planilha = SpreadsheetApp.openById("1xtoZVnFBdAgp39E7pmAUyIOy3uQJ7CY0Tp24Cuw32E4");
  const aba = planilha.getSheetByName("Reembolso") || planilha.insertSheet("Reembolsos");
  
  // Cria a aba se não existir 
  if (!aba) {
    aba = planilha.insertSheet("Reembolso")
    aba.appendRow(["Data envio", "Cliente", "Técnico", "Data Saída", "Data Retorno",
      "Alimentação", "Mercado", "Combustível", "Táxi", "Estacionamento", "Outros",
      "Soma Geral", "Link Nota", "Status"]);
  }
  const novaLinha = [
    new Date(), // Data de envio
    dados.cliente || "",
    dados.tecnico || "",
    dados.data_saida || "",
    dados.data_retorno || "",
    dados.Alimentação || "0.00",
    dados.Mercado || "0.00",
    dados.Combustivel || "0.00",
    dados.Taxi || "0.00",
    dados.Estacionamento || "0.00",
    dados.Outros || "0.00",
    dados.soma_geral || "0.00",
    "", // Link da nota fiscal (vamos tratar depois)
    "Pendente"
  ];
  aba.appendRow(novaLinha)

  return `Obrigado, ${dados.tecnico}! Seus dados foram salvos com sucesso.`;
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
