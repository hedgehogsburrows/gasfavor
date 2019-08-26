/**
 * Делает рассылку из файла,
 * в случае если заполнено поле "эл.почта"
 * и в файле РезультатыОпроса, нет искомого номера
 */

function sendMail3() {
  // Получение данных
  // Контакты
  var contacts = getDataRange_(
    '1T5bVO51XOJC7cEjkEIXpwQxVjtIG3eX2ntifvsaS1DI',
    'Лист1'
  ).getValues();

  // Ответы
  var answers = getDataRange_(
    '17zQO9ZOe8ra03OOOVUHC9_1bouz8R6q5epxY5AegGsk',
    'Лист1'
  ).getValues();

  // Плоский индекс ответов
  var answersIndex = answers.map(function(row) {
    return row[1];
  });

  // Только те, где есть эл. почта и нет в индексе
  contacts.forEach(function(row) {
    if (row[3] === 'эл.почта' && answersIndex.indexOf(row[0]) === -1) {
      Logger.log('Отправить email для %s на адрес %s', row[2], row[4]);
    }
  });
}

/**
 * Возвращает диапазон листа
 *
 * @param {string} spreadsheetId
 * @param {string} sheetName
 * @return {GoogleAppsScript.Spreadsheet.Range}
 */
function getDataRange_(spreadsheetId, sheetName) {
  return SpreadsheetApp.openById(spreadsheetId)
    .getSheetByName(sheetName)
    .getDataRange();
}
