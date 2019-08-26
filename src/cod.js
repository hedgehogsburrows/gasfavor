/**
 * Делает рассылку из файла,
 * в случае если заполнено поле "эл.почта"
 * и в файле РезультатыОпроса, нет искомого номера
 */

function sendMail() {
  var day = new Date();
  var dayFilter = day.setDate(day.getDate() - 40);
  var emalPost = 'эл.почта';

  //  Берем данные из файла с контактами
  var sheet = SpreadsheetApp.openById(
    '1T5bVO51XOJC7cEjkEIXpwQxVjtIG3eX2ntifvsaS1DI'
  ).getSheetByName('Лист1');
  var numRows = sheet.getLastRow();
  var dataRange = sheet.getRange(1, 1, numRows, 5);
  var data = dataRange.getValues();

  //  Берем данные из файла с ответами
  var sheetAnswer = SpreadsheetApp.openById(
    '17zQO9ZOe8ra03OOOVUHC9_1bouz8R6q5epxY5AegGsk'
  ).getSheetByName('Лист1');
  var lastRowAnswer = sheetAnswer.getLastRow();
  var dataRangeAnswer = sheetAnswer.getRange(1, 1, lastRowAnswer, 2);
  var dataAnswer = dataRangeAnswer.getValues();

  for (var i = 0; i < data.length; i++) {
    var dataAll = data[i];
    var dataFlat = dataAll[0];
    var listEmail = dataAll[3];
    var emailAdress = dataAll[4];

    for (var q = 0; q < dataAnswer.length; q++) {
      var dataAnswerAll = dataAnswer[q];
      var dataAnswerFlat = dataAnswerAll[1];
      var dataAnswerDay = dataAnswerAll[0];

      if (
        emalPost == listEmail &&
        dataAnswerDay > dayFilter &&
        dataAnswerFlat != dataFlat
      ) {
        var arr = data;
        var arrEmail = emailAdress;
        Logger.log(arrEmail);
      }
    }
  }
}
