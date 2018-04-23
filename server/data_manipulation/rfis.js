const jsonfile = require('jsonfile');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

module.exports.itemize_cfe_tracked = async function(data, env, user){
  //Function creates new JSON file w/ RFIs broken down by Official Response, Tagged on Drawings, Distribution
    //These are additional items tracked - that need to be tracked for Reporting
    let itemized = [];

    for (let rfi of data){
      //Establish temporary variable
      let d1 = await append_data(rfi, 'Official Response');
        itemized.push(d1);
      let d2 = await append_data(rfi, 'Tagged on Drawings');
        itemized.push(d2);
      let d3 = await append_data(rfi, 'Distributed');
        itemized.push(d3);

    }// Close for loop
    //console.log(itemized);
    //Write to JSON File
    let file = `C:/Users/${user}/Dropbox/Tableau Reporting/custom_reporting/${env}/rfi_cfe_tracked`
    jsonfile.writeFile(`${file}.json`, itemized,{spaces: 2, EOL: '\r\n'})

    let fields = ['id', 'number', 'subject', 'updated_at', 'status', 'time_resolved', 'company_id', 'project_id', 'type', 'completion']
    const json = new Json2csvParser({fields, delimiter: ',', excelStrings: false});
    let csv = json.parse(itemized);


    fs.writeFile(`${file}.csv`, csv, function(err){
      if(err) {console.log(err)}
      console.log('saved!!!')
    })

    //csvdata.write(`${file}.csv`,csv,{delimiter: ','});

    return 'complete'
}

function append_data(rfi, type){
  let temp = {
    id: rfi.id,
    number: rfi.number,
    subject: rfi.subject,
    updated_at: rfi.updated_at,
    status: rfi.status,
    time_resolved: rfi.time_resolved,
    company_id: rfi.company_id,
    project_id: rfi.project_id,
  }

  switch(type){
    case 'Official Response':
    temp.type = 'Official Response';
    temp.completion = rfi.official_response_override;
    break;
    case 'Tagged on Drawings':
    temp.type = 'Tagged on Drawings';
    temp.completion = rfi.tagged_override;
    break;
    case 'Distributed':
    temp.type = 'Distributed';
    temp.completion = rfi.distributed;
    break;
  }

  return temp
}
