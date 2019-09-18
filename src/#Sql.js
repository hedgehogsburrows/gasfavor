
function getAlaSql(sql)
{
  var tables = Array.prototype.slice.call(arguments, 1);  
  var request = convertToAlaSql_(sql);
  var res = alasql(request, tables);
  //return JSON.stringify(res);
  return convertAlaSqlResultToArray_(res);
}



function test_AlaSqlSelect()
{
  var file = SpreadsheetApp.getActive();
  var sheet = file.getSheetByName('East');
  var range = sheet.getDataRange();
  var data = range.getValues();
  
  var sql = "select * from ? where Col5 > 50 and Col3 = 'Jones'"
  Logger.log(convertAlaSqlResultToArray_(getAlaSqlSelect_(data, sql)));
  /*
  [  
     [  
        Sun Jan 07 12:38:56      GMT+02:00      2018,
        East,
        Jones,
        Binder,
        60.0,
        4.99,
        299.40000000000003                                            // error: precision =(
     ],
     [  
        Tue Jan 02 17:13:24      GMT+02:00      2018,
        East,
        Jones,
        Binder,
        60.0,
        8.99,
        539.4
     ],
     [  
        Fri Dec 29 23:59:13      GMT+02:00      2017,
        East,
        Jones,
        Pen,
        64.0,
        8.99,
        575.36
     ],
     [  
        Thu Dec 21 06:45:36      GMT+02:00      2017,
        East,
        Jones,
        Pen Set,
        62.0,
        4.99,
        309.38
     ]
  ]
  
  */

}


function getAlaSqlSelect_(data, sql)
{
  var request = convertToAlaSql_(sql);
  var res = alasql(request, [data]);
  // [{0=2016.0, 1=a, 2=1.0}, {0=2016.0, 1=a, 2=2.0}, {0=2018.0, 1=a, 2=4.0}, {0=2019.0, 1=a, 2=5.0}]
  return convertAlaSqlResultToArray_(res);
}



function convertToAlaSql_(string)
{
  var result = string.replace(/(Col)(\d+)/g, "[$2]");
  result = result.replace(/\[(\d+)\]/g, function(a,n){ return "["+ (+n-1) +"]"; });
  return result;
}




function convertAlaSqlResultToArray_(res)
{
  var result = [];
  var row = [];
  res.forEach
  (
  function (elt)
  {
    row = [];
    for (var key in elt) { row.push(elt[key]); }
    result.push(row);
  }  
  );
  return result;
}