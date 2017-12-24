let restful = require('node-restful');
let mongoose = restful.mongoose;
mongoose.connect("mongodb://localhost/api/apikeys")

let Schema = mongoose.Schema

let apiKeySchema = new Schema({
  Type: String,
  Key: String
})

module.exports = restful.model('ApiKey', apiKeySchema)
