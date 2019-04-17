// <!-- ARRAY TESTING -->//
function testArray() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get full array of Budget Pricing Breakdown Sheet
  var originalArray = ss.getRangeByName('XxTestRange').getValues();
  // Delete unused columns from array. Only Leaves sheetNumber, description, qty, UM, unitCost
  var newArray = originalArray.map(function(row) {
    return [row[0], row[5], row[6], row[7], row[10]];
  });
  // Delete unused rows that have a value of X in the sheetNumber
  var bigArray = newArray.filter(function(item) {
    return item[0] != 'X';
  });

  // Get array of Applicable Tabs
  var originalSheetsArray = ss.getRangeByName('XxTestRange2').getValues();
  // Remove unused column
  var newSheetsArray = originalSheetsArray.map(function(row) {
    return [row[0], row[2]];
  });
  // Delete not applicable rows
  var sheetCheckBad = newSheetsArray.filter(function(item) {
    return item[1] != 'Not Applicable';
  });
  // Separate just appicable trades
  var sheetCheck = sheetCheckBad.map(function(row) {
    return [row[0]];
  });

  for (var i = 0; i < sheetCheck.length; i++) {
    var sheetNumber = sheetCheck[i][0];
    var bigArrayfilter = filterBuilder_(sheetNumber);
    var pasteArray = bigArray.filter(bigArrayfilter);
    Logger.log(sheetNumber);
    Logger.log(pasteArray);
  }
}

// Pull individual Arrays based on sheet numbers
var filterSheetLogic = function(item, sheetNumber) {
  if (item[0] == sheetNumber) {
    return true;
  } else {
    return false;
  }
};

/**
 * The big array filter's builder. It's a fabric
 * @param {string} sheetNumber
 */
var filterBuilder_ = function(sheetNumber) {
  return function(item, i, _) {
    return item[0] == sheetNumber;
  };
};
