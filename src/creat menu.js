function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('AlaSql')
      .addItem('Тест SQL', 'test_AlaSql')
      .addToUi();
}