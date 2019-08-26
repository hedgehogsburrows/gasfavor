/* globals Drive3, URLSearchParams */
/* exported main */

function t() {
   var url = new URL("http://foo.bar/?x=1&y=2");
  //  Logger.log(url.host);
  // var search = url.search;
  var params = new URLSearchParams(url.search);
  params.append('name', 'value');
  Logger.log(url.host + params.toString());
}

function main() {
  var list = Drive3.list('17LFCXrn9mwT-xd0w1GOho9jInLZaY-HUvyJvhBGR_s8');
  Logger.log(list);
}
// function myFunction() {
//   var values = SpreadsheetApp.openById(
//     '1kljm5xi1Wds6yNQIOGyvGkk1HO6LrDuxnipJbZ0gI0w'
//   )
//     .getSheetByName('макси - ассистенты, стажеры 2018')
//     .getDataRange()
//     .getValues();
//   var res = values
//     .map(function(row) {
//       return row[2];
//     })
//     .slice(1)
//     .join(', ');
//   Logger.log(res);
// }

// // по времени 5 мин
// function r() {
//   var cache = 'asdfasdf';
//   if (!cache) {
//     cache = upkdateCache();
//   }

//   eval(cache);
// }

// // случается при calendar update
// function upkdateCache() {
//   ScriptApp.invalidateAuth();
// }

// function d() {
//   Drive.About.get();
//   var rf = DriveApp.getRootFolder();

//   //    var payload = {
//   //    inputformat: 'jpg',
//   //    outputformat: 'png'
//   //  };

//   //   var params = {
//   //    method: 'GET',
//   //    headers: { authorization: 'Bearer ' + ScriptApp.getOAuthToken() }
//   //  }; https://drive.google.com/open?id=1bi8BQiPP509UJreRoNf3ubQSWmNBHHZy&usp=sharing
//   // https://docs.google.com/document/d/17ei63JfwHk6OJtj7oa_Vdko30aFdYQNmFlcATLr8MxI/edit?usp=sharing
//   // https://docs.google.com/spreadsheets/d/17LFCXrn9mwT-xd0w1GOho9jInLZaY-HUvyJvhBGR_s8/edit?usp=sharing
//   //  var fetch = UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/1bi8BQiPP509UJreRoNf3ubQSWmNBHHZy/permissions', {
//   //    method: 'get',
//   //    //    contentType: 'application/json',
//   //    headers: {
//   //      Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
//   //    },
//   //    //    payload: JSON.stringify(payload)
//   //  });

//   //  var content = JSON.parse(fetch.getContentText());

//   Logger.log(content);
//   //  payload = {
//   //    input: 'upload'
//   // outputformat: 'png',
//   // file: 'export.png'
//   //  };

//   var fetch = UrlFetchApp.fetch(
//     'https://www.googleapis.com/drive/v3/files/17LFCXrn9mwT-xd0w1GOho9jInLZaY-HUvyJvhBGR_s8/permissions',
//     {
//       method: 'post',
//       headers: {
//         Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
//       },
//       muteHttpExceptions: true,
//       payload: {
//         role: 'writer',
//         type: 'user',
//         emailAddress: 'alexanderivanovdev@gmail.com'
//       }
//     }
//   );
//   var content = JSON.parse(fetch.getContentText());
//   Logger.log(content);
// }
