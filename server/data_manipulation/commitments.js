const jsonfile = require('jsonfile');

module.exports.itemize_cfe_tracked = async function(data, env, user){
  //Function creates new JSON file w/ RFIs broken down by Official Response, Tagged on Drawings, Distribution
    //These are additional items tracked - that need to be tracked for Reporting
    let itemized = [];



    for (let item of data){
      //Establish temporary variable
      let d1 = await append_data(item, 'signed_contract_recieved_date');
        itemized.push(d1);
      let d2 = await append_data(item, 'safety_program_recieved');
        itemized.push(d2);
      let d3 = await append_data(item, 'coi_approved');
        itemized.push(d3);
      let d4 = await append_data(item, 'coi_expiration');
        itemized.push(d4);
      let d5 = await append_data(item, 'contractors_license_recieved');
        itemized.push(d5);
      let d6 = await append_data(item, 'business_license_recieved');
        itemized.push(d6);


    }// Close for loop
    console.log(itemized);
    //Write to JSON File
    let file = `C:/Users/${user}/Dropbox/Tableau Reporting/custom_reporting/${env}/commitments_tracked.json`
    jsonfile.writeFile(file, itemized,{spaces: 2, EOL: '\r\n'})

    return 'complete'
}

function append_data(item, type){
  let temp = {
    id: item.id,
    number: item.number,
    title: item.title,
    updated_at: item.updated_at,
    status: item.status,
    company_id: item.company_id,
    project_id: item.project_id,
    commitment_type: item.commitment_type,
    signed_contract_recieved_date: item.signed_contract_recieved_date,
    safety_program_recieved: item.safety_program_recieved,
    coi_approved: item.coi_approved,
    coi_expiration: item.coi_expiration,
    contractors_license_recieved: item.contractors_license_recieved,
    business_license_recieved: item.business_license_recieved,
  }
  switch(type){
    case 'signed_contract_recieved_date':
      temp.type = 'signed_contract_recieved_date';
      if(item.signed_contract_recieved_date != undefined){
        temp.completion = true;
      } else {
        temp.completion = false;
      }
    break;
    case 'safety_program_recieved':
      temp.type = 'safety_program_recieved';
      if(item.safety_program_recieved != undefined){
        temp.completion = true;
      } else {
        temp.completion = false;
      }
    break;
    case 'coi_approved':
      temp.type = 'coi_approved';
      if(item.coi_approved != undefined){
        temp.completion = true;
      } else {
        temp.completion = false;
      }
    break;
    case 'coi_expiration':
      temp.type = 'coi_expiration';
      if(item.coi_expiration != undefined){
        temp.completion = true;
      } else {
        temp.completion = false;
      }
    break;
    case 'contractors_license_recieved':
      temp.type = 'contractors_license_recieved';
      if(item.contractors_license_recieved != undefined){
        temp.completion = true;
      } else {
        temp.completion = false;
      }
    break;
    case 'business_license_recieved':
      temp.type = 'business_license_recieved';
      if(item.business_license_recieved != undefined){
        temp.completion = true;
      } else {
        temp.completion = false;
      }
    break;
  }

  return temp
}
