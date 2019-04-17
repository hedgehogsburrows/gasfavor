function myFunc() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var bench = sheet
    .getSheets()[0]
    .getRange('B1:F14')
    .getValues();
  var client = bench[1][0];

  if (client === '') {
    // check if client name is not empty
    SpreadsheetApp.getUi().alert('client is empty');
    return;
  }

  var chcker = bench
    .filter(function(check) {
      return (
        check[0] === '' &&
        [check[1], check[2], check[3], check[4]].join('') !== ''
      );
    })
    .map(function(_, i) {
      return 'line ' + (i + 1) + ' has no company name';
    });
  if (chcker.length) {
    SpreadsheetApp.getUi().alert(chcker.join('\n'));
    return;
  }

  for (var c = 0; c < bench.length; c++) {
    if (c == bench.length - 1) {
      // Function run normaly
    }
  }
}
