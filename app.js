var axios = require('axios');
var fetch = require('node-fetch');
var jsonfile = require('jsonfile');
var express = require('express');
var schedule = require('node-schedule');

var apiKey = 'n3K9lqmL730FeNnei97Q';



//downloadAPIData();




async function downloadAPIData(){
let models = ['projects', 'pcco','milestone','drawingsets','drawingsheets','rfis','submittals','shop_drawings','inspections','manpower']
  for (var i = 0; i < models.length; i++){
    downloadData(models[i]);
  }// model loop
}


function downloadData(name){
  fetch('https://construct-pm.com/api/' + name + '/' + apiKey)
    .then(function(res){
      return res.json();
    }).then(function(json){
      var file = 'C:/Users/rigo/Dropbox/Tableau Reporting/custom_reporting/' + name + '.json'
      var obj = json;
      jsonfile.writeFile(file, obj,{spaces: 2, EOL: '\r\n'}),
      console.log('file downloaded: ' + name)
    })
}
var app = express();
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

var rule = new schedule.RecurrenceRule();
rule.minute = 12;

var j = schedule.scheduleJob(rule, async function(){
  console.log('scheduled run time')
  var system = await os.platform();
  var d = new Date();
  if (d.getHours()===1){
    downloadAPIData();
  }
});



/*
fetch('https://construct-pm.com/api/weather')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
        var file = './data/weather.json';
        var obj = json;
        jsonfile.writeFile(file,obj , function(err){console.error(err)})
    });
*/
