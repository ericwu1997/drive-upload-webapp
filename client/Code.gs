function doGet(e) {
  if(!e.parameter.folder_id) {
    var htmlOutput = HtmlService.createTemplateFromFile('Index')
    htmlOutput.list = getArchive()
    return htmlOutput.evaluate()
  }
  var htmlOutput = HtmlService.createTemplateFromFile('Display')
  htmlOutput.image_list = getImagesByFolderId(e.parameter.folder_id)
  return htmlOutput.evaluate()
}

function getArchive() {
  var list = []
  var root = DriveApp.getFolderById('FOLDER_ID')
  var folders = root.getFolders()
  while (folders.hasNext()) {
    var category = folders.next()
    var event_list = []
    var events = category.getFolders()
    while (events.hasNext()) {
      var event = events.next()
      event_list.push({
        name: event.getName(),
        folder_id: event.getId()
      })
    }
    list.push({
      category: category.getName(),
      events: event_list
    })
  }
  return list;
}

function getImagesByFolderId(id) {
  var list = []
  var folder = DriveApp.getFolderById(id)
  var files = folder.getFiles()
  while (files.hasNext()) {
    list.push(files.next().getId())
  }
  return list;
}