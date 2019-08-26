/**
 * Делает рассылку из файла,
 * в случае если заполнено поле "эл.почта"
 * и в файле РезультатыОпроса, нет искомого номера
 */
function sendMail2() {
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
  // Делаем срез последних 40 дней
  var dt = new Date().getTime() - 1000 * 60 * 60 * 24 * 40;
  var answersIndex = answers
    .filter(function(row) {
      return row[0] && row[0].getTime && row[0].getTime() > dt;
    })
    .map(function(row) {
      return row[1];
    });

  // Только те, где есть эл. почта и нет в индексе
  contacts.forEach(function(row) {
    if (row[3] === 'эл.почта' && answersIndex.indexOf(row[0]) === -1) {
      Logger.log('Отправить email для %s на адрес %s', row[2], row[4]);
    }
  });
}
