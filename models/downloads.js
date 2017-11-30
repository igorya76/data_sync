const mongoose = require('mongoose');

const DownloadsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  date_iso: {
    type: Date,
    required: true
  },
  sync_type: {
    type: String,
    required: true
  }
});

let Downloads = module.exports = mongoose.model('Downloads', DownloadsSchema);


module.exports.addDownloads = async function(data){
    // Does Downloads Exist
    return await newItem(data);
}

module.exports.returnAll = function(callback){
  Downloads.find({}, function(err, data){
    if (err){
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

module.exports.returnAllret = function(callback){
  Downloads.find({}, function(err, data){
    if (err){
      return err
    } else {

      return data
    }
  })
}

module.exports.returnMatching = function(query, callback){
  Downloads.find(query, null, {sort: {number: -1}}, function(err, data){
    if(err){
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

module.exports.returnMatchingRet = function(query){
  return Downloads.find(query, null, {date_iso: {number: -1}}, function(err, data){
    if(err){
      return console.log(err);
    } else {
      //console.log(data);
      return data
    }
  });
}

module.exports.returnSingle = function(query, callback){
  Downloads.findOne(query,function(err, item){
    if (err) throw err;
    callback(null, item);
  });
}

module.exports.returnSingleRet = function(query, callback){
  return Downloads.findOne(query,function(err, item){
    if (err) throw err;
    return item;
  });
}


function newItem(data){
  let d = new Downloads(data);
  return d.save(function(err){
    if(err){
      console.log(err);
      return
    } else {
      console.log('success updating')
      return 'completed'
    }
  })
};
