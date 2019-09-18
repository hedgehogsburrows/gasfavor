// =========================================================================
//                        Функция очищения строк 
// =========================================================================
function removeEmptyRows(sh){
  //var sh = SpreadsheetApp.getActiveSheet();
  var maxRows = sh.getMaxRows(); // кол-во строк
  var lastRow = sh.getLastRow(); // последняя непустая строка. Если все пустые, то 0
  
  Logger.log("maxRows = " + maxRows);
  Logger.log("lastRow = " + lastRow);
  
  if (maxRows-lastRow != 0){
    if(lastRow == 0) // если все строки пустые, то будет 0
    if(maxRows == 1) return;
    else
    sh.deleteRows(2, maxRows-1); // удаляет все строки кроме первой
    else
    sh.deleteRows(lastRow+1, maxRows-lastRow); // если не все строки пустые, то удаляет с последней непустой до последней пустой
    }
}