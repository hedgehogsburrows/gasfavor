/* global AlaSQLGS, getAlaSql */
/* exported myFunction2, myFunction3 */

function myFunction2() {
  var query =
    "select MATRIX Col1,Col2,Col4,Col8,Col15 from ? where Col15>=DATE('20190525')";
  query = AlaSQLGS.fromColNota(query);

  var data = SpreadsheetApp.getActive()
    .getSheetByName('SOURCE_FOR_AlaSql')
    .getDataRange()
    .getValues();

  var header = data.splice(0, 2).map(function(row) {
    return [1, 2, 4, 8, 15].map(function(i) {
      return row[i];
    });
  });

  var alasql = AlaSQLGS.load();

  var res = alasql(query, [data]);

  var values = header.concat(res);

  SpreadsheetApp.getActive()
    .getSheetByName('Лист3')
    .clearContents()
    .getRange(1, 1, values.length, values[0].length)
    .setValues(values);
}

function myFunction3() {
  var query =
    "select MATRIX Col1,Col2,Col4,Col8,Col15 from ? where Col15>=DATE('20190525')";
  query = AlaSQLGS.fromColNota(query);

  var data = SpreadsheetApp.getActive()
    .getSheetByName('SOURCE_FOR_AlaSql')
    .getDataRange()
    .getValues();
  var header = data.splice(0, 2).map(function(row) {
    return [1, 2, 4, 8, 15].map(function(i) {
      return row[i];
    });
  });

  var res = getAlaSql(query, [data]);

  var values = header.concat(res);

  SpreadsheetApp.getActive()
    .getSheetByName('Лист3')
    .clearContents()
    .getRange(1, 1, values.length, values[0].length)
    .setValues(values);
}
