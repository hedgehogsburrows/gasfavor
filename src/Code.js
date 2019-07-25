// https://developers.google.com/apps-script/guides/html/

// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  SpreadsheetApp.getUi() // Or Document App or Slides App or Form App.
    .createMenu('Dialog')
    .addItem('Open', 'openDialog')
    .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setWidth(1000)
    .setHeight(1000);
  SpreadsheetApp.getUi() // Or Document App or Slides App or Form App.
    .showModalDialog(html, 'Dialog title');
}
