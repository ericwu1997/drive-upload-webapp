function doGet() {
  var htmlOutput = HtmlService.createTemplateFromFile('index')
  htmlOutput.category_list = getCategory()
  return htmlOutput.evaluate();
}

function getCategory() {
  var list = []
  var root = DriveApp.getFolderById('FOLDER_ID')
  var folders = root.getFolders()
  while (folders.hasNext()) {
    var category = folders.next()
    list.push({
      name: category.getName(),
      id: category.getId()
    })
  }
  return list;
}

function getAt() {
  return ScriptApp.getOAuthToken();
}

// This commented line is used for enabling Drive API and adding a scope of "https://www.googleapis.com/auth/drive".
// So please don't remove this.
// DriveApp.createFile();