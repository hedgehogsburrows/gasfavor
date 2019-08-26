(function(self) {
  var token = ScriptApp.getOAuthToken();
  var list = function(fileId, parameters) {
    parameters = parameters || {};
    var url = Utilities.formatString(
      'https://www.googleapis.com/drive/v3/files/%s/permissions',
      fileId
    );
    var fetch = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token
      },
      muteHttpExceptions: true
    });
    return JSON.parse(fetch.getContentText());
  };

  var drive3_ = { list: list };

  self.Drive3 = drive3_;
})(this);

// 04765447575080188543

/**
 *
 * @param {string} fileId
 */
// function list_(fileId) {
//   var url = Utilities.formatString(
//     'https://www.googleapis.com/drive/v3/files/%s/permissions',
//     fileId
//   );
//   var fetch = UrlFetchApp.fetch(url, {
//     method: 'post',
//     headers: {
//       Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
//     },
//     muteHttpExceptions: true,
//     payload: {
//       role: 'writer',
//       type: 'user',
//       emailAddress: 'alexanderivanovdev@gmail.com'
//     }
//   });
//   var content = JSON.parse(fetch.getContentText());
//   Logger.log(content);
// }
