var axios = require('axios');
var fetch = require('node-fetch');
var jsonfile = require('jsonfile');
var express = require('express');
var schedule = require('node-schedule');

var apiKey = 'n3K9lqmL730FeNnei97Q';

var Download = require('../models/downloads');

module.exports.downloadAPIData = async function (type){
let models = ['projects', 'pcco','drawingsets','drawingsheets','rfis','submittals','shop_drawings','inspections','manpower','project_roles','document_watch_list','documents_monitored','parent','syncLog','milestones_current','milestones_log','directory','safety_reports','safety_items']
  for (var i = 0; i < models.length; i++){
  var ti = await  downloadData(models[i],type);
  console.log(ti);
  }// model loop
  //Export Sync Data to File
  var downloads = await Download.returnAllret();
  var file = 'C:/Users/rigo/Dropbox/Tableau Reporting/custom_reporting/dropbox_sync.json'
  var obj = downloads;
  jsonfile.writeFile(file, obj,{spaces: 2, EOL: '\r\n'})

  return 'loop completed'
}




async function downloadData(name, type){
 return await fetch('https://construct-pm.com/api/' + name + '/' + apiKey)
    .then(function(res){
      return res.json();
    }).then(async function(json){
      var file = 'C:/Users/rigo/Dropbox/Tableau Reporting/custom_reporting/' + name + '.json'
      var obj = json;
      jsonfile.writeFile(file, obj,{spaces: 2, EOL: '\r\n'}),
      console.log('file downloaded: ' + name);

      var date_readable = await getDate('readable');
      var date_iso = await getDate('iso')

      var data = {
        name: name,
        date: date_readable,
        date_iso: date_iso,
        sync_type: type
      }

      return Download.addDownloads(data);
    })
  
}

function getDate(type){
  var d = new Date()
  if(type = 'readable'){
    return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()
  } else {
    return d
  }

}
