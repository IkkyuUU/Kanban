//The entry point of our Provider!
// CommonJS picks up the index.js of a directory by default 
//when we perform an import against the directory.

if(process.env.NODE_ENV === 'production') {
  module.exports = require('./Provider.prod');
}
else {
  module.exports = require('./Provider.dev');
}