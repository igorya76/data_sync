var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data_extract', { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

console.log('old app')
let downloads = require('./server/download');
get();
async function get(){
  var i = await downloads.downloadAPIData('scheduled');
  console.log(i)
  mongoose.connection.close()

}
