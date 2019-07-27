function updateLineCharts_() {
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  sheet.getCharts().forEach(function(chart) {
    if (chart.getType() === Charts.ChartType.LINE) {
      var build = ajustViewWindow_(chart);
      sheet.updateChart(build);
    }
  });
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.EmbeddedChart} chart
 * @returns {GoogleAppsScript.Spreadsheet.EmbeddedChart}
 */
function ajustViewWindow_(chart) {
  var values = chart
    .getRanges()[0]
    .getValues()
    .reduce(function(p, c) {
      var v = c[1];
      if (!isNaN(parseFloat(v)) && isFinite(v)) p.push(v);
      return p;
    }, []);
  var min_ = Math.min.apply(Math, values);
  var max_ = Math.max.apply(Math, values);
  var delta = (max_ - min_) * 0.1;
  var min = parseInt(min_ - delta);
  var max = parseInt(max_ + delta);
  return chart
    .modify()
    .setOption('vAxes', { 0: { viewWindow: { min: min, max: max } } })
    .build();
}
