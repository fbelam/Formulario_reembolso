function doGet() {
  return HtmlService.createHtmlOutputFromFile('Formulario');
}

function processarFormulario(dados) {
  Logger.log(dados);  // Apenas para demonstração
  return `Obrigado, ${dados.cliente}! Sua mensagem foi recebida.`;
}