//The WMATA API key is currently exposed. This database provides the
//option to save this and other APIs keys to a collection for AJAX call retrieval.

let restful = require('node-restful');
let mongoose = restful.mongoose;
mongoose.connect("mongodb://localhost/api/apikeys")

let Schema = mongoose.Schema

let apiKeySchema = new Schema({
  Type: String,
  Key: String
})

module.exports = restful.model('ApiKey', apiKeySchema)
