function doGet() {
  return HtmlService.createHtmlOutputFromFile('Formulario');
}

// Processa o formulário de dados simples (nome, datas, etc.)
function processarFormulario(dados) {
  Logger.log(dados);  // Para visualização no log do Apps Script
  return `Obrigado, ${dados.cliente}! Sua mensagem foi recebida.`;
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
