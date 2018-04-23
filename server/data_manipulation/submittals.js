const jsonfile = require('jsonfile');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

module.exports.item_validation = async function(data, env, user){
  let itemized = [];

  for (let i = 0; i < data.length; i++){
    let validation = await validation_requirements(data[i]);

    itemized = itemized.concat(validation);


  }

  //console.log(itemized);

  let file = `C:/Users/${user}/Dropbox/Tableau Reporting/custom_reporting/${env}/submittal_validation`
  jsonfile.writeFile(`${file}.json`, itemized,{spaces: 2, EOL: '\r\n'})

  let fields = ['id','number', 'revision', 'title', 'project_id', 'validation_type', 'validation_status']
  const json = new Json2csvParser({fields, delimiter: ',', excelStrings: false});
  let csv = json.parse(itemized);

  fs.writeFile(`${file}.csv`, csv, function(err){
    if(err) {console.log(err)}
    console.log('saved!!!')
  })

  return 'complete'
};



let validation_requirements = (submittal) =>{
  let temp = {
    id: submittal.id,
    number: submittal.number,
    revision: submittal.revision,
    title: submittal.title,
    project_id: submittal.project_id
  }
  if(submittal.primary_status != undefined){
    if(submittal.current_revision === true){
      switch(submittal.primary_status.response.considered){
        case 'rejected':
        case 'revise and resubmit':
        temp.validation_type="Resubmittal Req";
        temp.validation_status = "Yes";
        break
        default:
        temp.validation_type="Resubmittal Req";
        temp.validation_status = "N/A";
      }
    } else{
      switch(submittal.primary_status.response.considered){
        case 'rejected':
        case 'revise and resubmit':
        temp.validation_type="Resubmittal Req";
        temp.validation_status = "No";
        break
        default:
        temp.validation_type="Resubmittal Req";
        temp.validation_status = "N/A";
      }
    }
  } else {
    temp.validation_type="Resubmittal Req";
    temp.validation_status = "N/A";
  }


  var distributed = submittal.distributed_submittals;
  let temp1 = {
    id: submittal.id,
    number: submittal.number,
    revision: submittal.revision,
    title: submittal.title,
    project_id: submittal.project_id
  }
  //console.log(submittal.status);
  if(submittal.status.status === 'Open'){
    temp1.validation_type ='Distribution';
    temp1.validation_status="N/A";
  } else if(distributed.length === 0){
    temp1.validation_type = 'Distribution';
    temp1.validation_status = "No";
  } else {
    temp1.validation_type="Distribution";
    temp1.validation_status = "Yes";
  }
  //console.log(temp)
  return [temp, temp1]
};
