// =========================================================================
//                        Функция теста AlaSql 
// SOURCES:
// https://sheetswithmaxmakhrov.wordpress.com/2018/03/21/sql-in-google-apps-script/
// https://docs.google.com/spreadsheets/d/1V0kHvuS0QfzgYTvkut9UkwcgK_51KV2oHDxKE6dMX7A/copy
// =========================================================================

function test_AlaSql()
{
  var file = SpreadsheetApp.openById("1Z0aXNhsqfjwkcp1E2fY4bfkV-9dcfKO1rwFwMp7abkM"); //  - id таблицы
  var sheet = file.getSheetByName('SOURCE_FOR_AlaSql'); // 'SOURCE_FOR_AlaSql' - имя листа с которого берутся данные
  var range = sheet.getDataRange(); // записывается весь диапазон где есть ячейки с данными
  var data_sheet = range.getValues(); // запись в переменную таблицы значений
  
  var sheet_result =  SpreadsheetApp.getActive().getSheetByName("Result_of_Test_AlaSql"); // лист куда записываем результат
  
  Logger.log("data_sheet.length" + data_sheet.length);
  Logger.log("data_sheet[0].length" + data_sheet[0].length);
  
  /*
  //var data1 = Utilities.formatDate(sheet.getRange(126, 15).getValue(), "GMT", "dd-MM-yyyy");
  var data1 = sheet.getRange(126, 15).getValue();
  Logger.log("data1  = " + data1);
  
  Logger.log("data1 < '30.07.2019' = " + (data1 < '30.07.2019' ? true : false)  ); // тест сравнение дат
  Logger.log("data1 < '25.07.2019' = " + (data1 < '25.07.2019' ? true : false)  ); // тест сравнение дат
  
  var left = new Date(2018,00,01);
  var right = new Date(2020, 09, 12);
  var date_left = Utilities.formatDate( left, "GMT" , "dd-MM-yyyy");
  var date_right = Utilities.formatDate( right, "GMT" , "dd-MM-yyyy");
  Logger.log("left = " + left); // result: left = Mon Jan 01 2018 00:00:00 GMT+0300 (MSK)
  Logger.log("date_left = " + date_left); // result:  date_left = 31-12-2017
  Logger.log("date_right = " + date_right); // result:  date_right = 11-10-2019
  */ 
  
  
  
  var sql = "select Col1, Col2, Col4, Col8, CAST(Col15 AS date) from ? WHERE Col15 > CAST('05-01-2019' AS date) "; // если применять CAST(Col15 AS date) то где не дата пишет NaN.aN.aN
  
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where Col15 BETWEEN '"+ date_left +"' AND '"+ date_right +"' ";     
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  (DATE(Col15)=CURRENT_DATE())  "; // не работает. Синтаксическая ошибка  
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  (Col15 >   CAST('01-01-2018' AS datetime) )  ";
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  (Col15 >  '25.07.2019')  "; // alasql работает, но возвращает неправльный фильтр  
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  (YEAR(DATE(Col15)) > 2018 )  "; // alasql работает, но возвращает пустой результат фильтра  
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where Col 15 BETWEEN DATE '01-01-2019' AND DATE '01-01-2020' "; // не работает  
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where Col 15 BETWEEN CONVERT(datetime, FLOOR(CONVERT(float, CAST('01-01-1900' AS DATETIME)))) AND CONVERT(datetime, FLOOR(CONVERT(float, Getdate()))) "; 
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where Col 15 BETWEEN "+ date_left.valueOf() +"   AND "+ date_right.valueOf() +" ";   
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where   DATE(Col15) > CURRENT_DATE() "; 
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  ( Col15 > "+ date_left + ")) "; 
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  ( DATE(Col15) > DATE('20-07-2018')) "; 
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where  ( YEAR(Col15) > YEAR('20.07.2018')) ";   
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where (Col15 <> '') or ( YEAR(Col15) > YEAR('20.07.2018')) ";   
  //var sql = "select Col1, Col2, Col4, Col8, Col15 from ?  where (Col15 <> '') or (DATE(Col15) BETWEEN '2018/01/01' AND '2019/01/01')  ";
  //var sql = "select Col1, Col2, Col4, Col8, Date(Col15) from ?  where  ( Col15 > Date '27/07/2019' )  ";
  //var sql = "select Col1, Col2, Col4, Col8, Date(Col15) from ?  where  ( Col15 > Date '27-07-2019' )  ";
  //var sql = "select Col1, Col2, Col4, Col8, Date(Col15) from ?  where  ( Col15 > Date '27.07.2019' )  ";
  
  var data = getAlaSql(sql, data_sheet); // вызов функции AlaSql
  
  //Logger.log("data = " + data);
  
  try // ПРОВЕРКА. ЕСЛИ РЕЗУЛЬТАТ ПУСТ, ТО ПРИ ВЫЗОВЕ data.lengt БУДЕТ ОШИБКА
  {
    Logger.log("data.length = " + data.length);
    Logger.log("data[0].length = " + data[0].length);
  }
  catch (e)
  {
    Browser.msgBox("Не найдено ни одной строки");
  }
  
  sheet_result.clearContents(); // очистка данных
  removeEmptyRows(sheet_result); // Вызов функции удаления строк лишних
  
  sheet_result.getRange(1, 1,data.length,data[0].length).setValues(data); // запись результата на лист. data.length - длинна строк,data[0].length - длинна столбцов
  
  //var name = Browser.inputBox('ID Check', 'Enter your name', Browser.Buttons.OK_CANCEL);
  // SpreadsheetApp.openById(id)  открыть таблицу по ее айди
  //Logger.log(data);  

}

function mapDtoN_(row){
  row[5] = row[5].getTime ? row[5].getTime() : 0;
}