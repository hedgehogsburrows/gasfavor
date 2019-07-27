// on editing the range C2 date and weight should be copied to data tab
function onEdit(e) {
  var spreadsheet = SpreadsheetApp.getActive();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Entry & Graph');

  var dss = SpreadsheetApp.getActiveSpreadsheet();
  var dsh = dss.getSheetByName('Data');

  // Row & column indexes of the active cell
  var col = e.range.getColumn();
  var row = e.range.getRow();

  // Set the editing cell C2
  if (e.range.getA1Notation() == 'C2') {
    if (sh.getRange(2, 3).getValue() == true) {
      // var datesRange = (dsh.getRange('A3:A1000'));

      // Get array of values in the search Range
      // var rangeValues = datesRange.getValues();
      // Loop through array and if condition met, add relevant
      // background color.
      // for ( i = 0; i < 1000 - 1; i++){
      // if(rangeValues[0][i] === sh.getRange("A2").getValue()){
      // copy date and weight to data tab
      // dsh.getRange("A"+(i+3)).setValue(sh.getRange("A2").getValue())
      // dsh.getRange("B"+(i+3)).setValue(sh.getRange("B2").getValue())
      // return;
      // };
      // };

      // Move all data in current data table down by one row
      dsh.getRange('A3:B1000').copyTo(dsh.getRange('A4:B1001'));

      // insert row in row number 3 in data tab ------ Removed because it messed up references to cells (e.g A3 moved down to A4)
      // dsh.getRange('A3:B3').insertCells(SpreadsheetApp.Dimension.ROWS);

      // copy date and weight to data tab
      dsh.getRange('A3').setValue(sh.getRange('A2').getValue());
      dsh.getRange('B3').setValue(sh.getRange('B2').getValue());

      // Sort values in case new date is out of order
      dsh.getRange('A3:B1000').sort({ column: 1, ascending: false });

      // pop up message on completion
      spreadsheet.toast('Data Copied....');

      // set back current date in A2 ( Date )
      sh.getRange('A2').setValue(new Date());

      // clear content in B2 ( Weight )
      sh.getRange('B2').clearContent();

      // uncheck the cell C2
      sh.getRange('C2').setValue(false);
    }
  }
  updateLineCharts_();
}

// on opening the file current date should be copied in A2
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Entry & Graph');
  sh.getRange('A2').setValue(new Date());
}

function modifyAllCharts() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var charts = sheet.getCharts();

  var chart = charts[0]
    .modify()
    .setOption('useFirstColumnAsDomain', true)
    .setOption('curveType', 'none')
    .setOption('domainAxis.direction', 1)
    .setOption('title', '7 Days')
    .setOption('treatLabelsAsText', false)
    .setOption('titleTextStyle.fontName', 'Verdana')
    .setOption('titleTextStyle.color', '#ffffff')
    .setOption('titleTextStyle.alignment', 'center')
    .setOption('titleTextStyle.bold', true)
    .setOption('hAxis.textStyle.color', '#ffffff')
    .setOption('vAxes.0.formatOptions.scaleFactor', 1)
    // .setRange(40, 100)
    .setOption('vAxes.0.viewWindowMode', 'explicit')
    .setOption('vAxes.0.textStyle.color', '#ffffff')
    .setOption('series.0.color', '#00ffff')
    .setOption('series.0.lineWidth', 2)
    .setOption('height', 178)
    .setOption('width', 392)
    .setPosition(3, 1, 1, 1)
    .build();
  sheet.updateChart(chart);
}

// /////////////////////''''''''''''''''''''''''''''''''''''''''''''''''/////////////////////////////
