function doGet() {
  return HtmlService.createHtmlOutputFromFile('Formulario');
}

function processarFormulario(dados) {
  Logger.log(dados);  // Apenas para demonstração
  return `Obrigado, ${dados.cliente}! Sua mensagem foi recebida.`;
}

function upload_file(form) {
  try{

    //Obter o arquivo que foi enviado no formulario
    var fileBlob = form.myfile;
    
    //Pega o caminho da pasta do drive
    var folderId = '1kXOYIcm0rRmfhabyye0AYsrNEHehE2gP';
    
    //Acessar a pasta usando o ID
    var folder = DriveApp.getFolderById(folderId);

    //Cria um novo arquivo dentro da pasta, usando o arquivo que foi enviado no formulario
    var file = folder.createFile(fileBlob);

    return 'Arquivo enviado com sucesso' + file.getName();
  } catch (error) {
    //Se der erro
    return 'Erro ao enviar o arquivo' + error.toString();
    
  }
}