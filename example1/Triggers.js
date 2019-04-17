/**
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function edit(e) {
  // there is the edit eveng action
}

/**
 * Register trigger
 * @returns {GoogleAppsScript.Script.Trigger}
 */
function regTrigger() {
  var activeSpreadsheet = SpreadsheetApp.getActive();
  var triggers = ScriptApp.getUserTriggers(activeSpreadsheet).filter(function(
    trigger
  ) {
    return (
      trigger.getEventType() === ScriptApp.EventType.ON_EDIT &&
      trigger.getHandlerFunction() === 'edit'
    );
  });

  if (triggers.length) return triggers[0];

  return ScriptApp.newTrigger('edit')
    .forSpreadsheet(activeSpreadsheet)
    .onEdit()
    .create();
}
