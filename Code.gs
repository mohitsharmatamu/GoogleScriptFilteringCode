//CREATE CUSTOM MENU
function onOpen() { 
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("Features")
    .addItem("Filters","showFormInSidebar")
    //.addItem("Modal Dialog Form","showFormInModalDialog")
    //.addItem("Modeless Dialog Form","showFormInModlessDialog")
    .addToUi();
  
}


//OPEN THE FORM IN SIDEBAR 
function showFormInSidebar() {      
  var form = HtmlService.createTemplateFromFile('Index').evaluate().setTitle('Contact Details');
  SpreadsheetApp.getUi().showSidebar(form);
}
/*

//OPEN THE FORM IN MODAL DIALOG
function showFormInModalDialog() {
  var form = HtmlService.createTemplateFromFile('Index').evaluate();
  SpreadsheetApp.getUi().showModalDialog(form, "Contact Details");
}


//OPEN THE FORM IN MODALLESS DIALOG
function showFormInModlessDialog() {
  var form = HtmlService.createTemplateFromFile('Index').evaluate();
  SpreadsheetApp.getUi().showModelessDialog(form, "Contact Details");
}

*/
function filterSheet(a, b, c) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Applications");
  var rang = sh.getDataRange();
  var filtercriteria = SpreadsheetApp.newFilterCriteria().whenTextEqualTo([b]).build();
  var filter = rang.getFilter() || rang.createFilter();
  filter.setColumnFilterCriteria(6, filtercriteria);
  var filtercriteria2 = SpreadsheetApp.newFilterCriteria().whenTextEqualTo([c]).build();
  filter.setColumnFilterCriteria(14, filtercriteria2);
}
//PROCESS FORM
function processForm(formObject){ 
  var sheet = SpreadsheetApp.getActiveSheet();
  filterSheet(formObject.applied_degree, formObject.nationality, formObject.gender);
  //sheet.appendRow([formObject.applied_degree,
                //formObject.nationality,
                //formObject.gender,
                //Add your new field names here
                //]);
}

//INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}