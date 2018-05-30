const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');


module.exports.add = async function(file,name, obj){
    let fields = await find_attr(name);

    if (fields){
      const json = new Json2csvParser({fields, delimiter: ',', excelStrings: false});
      let csv = json.parse(obj);

      fs.writeFile(`${file}.csv`, csv, function(err){
        if(err) {console.log(err)}
        console.log('saved!!!')
      })
    }
}

module.exports.add_unwind = async function(file,name, obj){
    var fields = await find_attr(name);
    var sub_fields = await find_sub_fields(name);
    console.log(name, fields, sub_fields);
    if (fields != null){
      const json = new Json2csvParser({fields, unwind: sub_fields, delimiter: ',', excelStrings: false});
      let csv = json.parse(obj);
      console.log('begin writing csv')
      fs.writeFile(`${file}-${name}.csv`, csv, function(err){
        if(err) {console.log(err)}
        console.log('saved', name)
      })
    }
}


async function find_attr(name){
  console.log(name);
  switch(name){
    case 'commitments':
      return ['id','project_id', 'company_id', 'source', 'actual_completion_date', 'contract_start_date', 'contract_estimated_completion_date', 'created_at', 'deleted_at', 'description','executed','inclusions', 'grand_total', 'number','pending_change_orders','pending_revised_contract','percentage_paid','private', 'remaining_balance_outstanding',
      'requisitions_are_enabled','retainage_percentage','revised_contract','total','title', 'total_draw_request_amount', 'updated_at','vendor.id','vendor.company','commitment_type', 'signed_contract_recieved_date','safety_program_recieved', 'coi_approved', 'coi_expiration','contractors_license_files', 'business_license_recieved','comments','hold_payment','last_sync',
      'link_document', 'wf_sync_date', 'primary_contact.vendor.name', 'primary_contact.name', 'primary_contact.permission_template.name', 'primary_contact.last_login_at'
      ]
    case 'directory':
      return ['address','business_phone','city','country_code','created_at','email_address','email-siganture','first_name','id','initials', 'is_active', 'is_employee', 'job_title','last_login_at', 'last_name', 'mobile_phone', 'notes', 'state_code', 'upadted_at', 'zip', 'permission_template.project_specific', 'permission_template.name','permission_template.name', 'vendor.name', 'vendor.id', 'project_id' ]
    case 'submittal_responses':
      return ['id', 'approvers.user.name', 'approvers.sent_date', 'approvers.returned_date', 'approvers.response.considered', 'approvers.distributed','approvers.comment', 'approver_type']
    case 'submittals':
      return    ['id','created_at','deleted_at','description','distributed_at','due_date','issue_date','private','recieved_date','submit_by','project_id','comments','number','revision','title','submittal_num','updated_at','csi_division','csi_name','resubmittal_required','current_revision','cfe_review','resonse_override','response_override_comments','required_by_milestone','internal_review_time','design_team_review','lead_time','requird_on_site_date','cfe_internal_review_time','cfe_design_team_review_time','cfe_lead_time','cfe_required_on_site_date','synced_with_procore', 'status.status', 'primary_status.user.id', 'primary_status.user.name', 'primary_status.sent_date', 'primary_status.returned_date', 'primary_status.response.considered', 'primary_status.distributed', 'primary_status.comment', 'associated_shop_drawing']
      break;
    case 'shop_drawings':
      return ['company_id', 'project_id', 'drawing_type', 'drawing_desc', 'required', '_id']
    case 'drawingsets':
      return ['id', 'project_id', 'name', 'craeted_at', 'updated_at', 'date', 'drawing_log_updated', 'cfe_review', 'shop_drawing_type', 'shop_DrawingSets', 'DrawingSets_distributed']
    case 'drawingsheets':
      return ['drawing_date', 'drawing_id', 'id', 'number', 'pdf_url','png_url','title','updated_at','current','revision_number','thumbnail_url','large_thumbnail_url','drawing_set.id','drawing_area.id','discipline.id','discipline.name','company_id','project_id','set_id', 'drawing_area_id']
    case 'workflow':
      return ['id', 'becomes_overdue_at', 'workflowed_object_id', 'workflowed_object_type', 'current_workflow_activies', 'current_workflow_state.status', 'current_workflow_state.name', 'current_workflow_state.id', 'workflow.class_name', 'workflow.domain', 'workflow.updated_at', 'workflow.created_at', 'workflow.description', 'workflow.name','workflow.id']
    case 'workflow_history':
      return ['id', 'bic_end', 'bic_start', 'comments','created_at', 'performed_by_id', 'updated_at','workflow_activity_id', 'workflow_instance_id', 'workflow_user_role_id']
    default:
      null
  }
}

async function find_sub_fields(name){
  switch(name){
    case 'submittal_responses':
      return [
        'approvers' ,
      ]
    break;
    default:
      return null
  }
}
