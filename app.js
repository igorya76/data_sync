var axios = require('axios');
var fetch = require('node-fetch');
var jsonfile = require('jsonfile');


var apiKey = 'n3K9lqmL730FeNnei97Q';



downloadAPIData();



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
