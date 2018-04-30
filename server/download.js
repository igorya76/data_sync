var axios = require('axios');
var fetch = require('node-fetch');
var jsonfile = require('jsonfile');
var express = require('express');
var schedule = require('node-schedule');
const csv_export = require('./csv_export');

var apiKey = 'n3K9lqmL730FeNnei97Q';

var Download = require('../models/downloads');

module.exports.downloadAPIData = async function (type){
let models = ['projects', 'pcco','drawingsets','drawingsheets','rfis','submittals','shop_drawings','inspections','manpower','project_roles','document_watch_list','documents_monitored','parent','syncLog','milestones_current','milestones_log','directory','safety_reports','safety_items','dates',"commitments","prime_contracts",'procoreSyncLog', "logs", "meetings"]
 //models = ['submittals'];

  let user = 'tableau'

  for (var i = 0; i < models.length; i++){
  //var ti = await  downloadData(models[i],type, 'staging', user);
  var ti = await downloadData(models[i], type, 'production', user);
//  console.log(ti);
  }// model loop
  //Export Sync Data to File
  var downloads = await Download.returnAllret();
  var file = `C:/Users/${user}/Dropbox/Tableau Reporting/custom_reporting/dropbox_sync`
  var obj = downloads;
  //console.log(downloads);
  jsonfile.writeFile(`${file}.json`, obj,{spaces: 2, EOL: '\r\n'}, function(err){
    console.log('error with ' + file);
  })



  return 'loop completed'
}


const rfis = require('./data_manipulation/rfis');
const submittals = require("./data_manipulation/submittals");
const commitments = require("./data_manipulation/commitments");

async function downloadData(name, type, env, user){
  let url = ''
  switch(env){
    case 'staging':
      url = 'https://construct-pm.com/api/';
      break;
    case 'production':
      url = 'https://www.cfe-tech.com/api/';
      break;
  }


 return await fetch(url + name + '/' + apiKey)
    .then(function(res){
      return res.json();
    }).then(async function(json){
      var file = `C:/Users/${user}/Dropbox/Tableau Reporting/custom_reporting/${env}/${name}`
      var obj = json;

      //JSON File
      jsonfile.writeFile(`${file}.json`, obj,{spaces: 2, EOL: '\r\n'});

      //Store to CSV
      csv_export.add(`${file}.csv`,name, obj);



      var date_readable = await getDate('readable');
      var date_iso = await getDate('iso')

      var data = {
        name: name,
        date: date_readable,
        date_iso: date_iso,
        sync_type: type,
        environment: env
      }

      //Allow for data manipulation
      switch(name){
        case 'rfis':
          console.log('Starting RFI Analytics');
          await rfis.itemize_cfe_tracked(obj, env, user);
        break;
        case 'submittals':
          console.log('Starting Submittal Analytics');
          await submittals.item_validation(obj, env, user);
          await csv_export.add_unwind(file,'submittal_responses', obj);
        break;
        case 'commitments':
          console.log('Starting Commitment Analytics');
          await commitments.itemize_cfe_tracked(obj, env, user);
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
