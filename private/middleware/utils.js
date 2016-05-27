(function (){
var jwt = require('jsonwebtoken'),
    database = require('../database/database');
    
var key='saoisvesHdLLAJrB6T';

module.exports = {

  // Function to encode an object to a string
  encode:function (decoded) {
    return new Promise(function (resolve, reject) {
      var encoded = jwt.sign(decoded, key);
      resolve(encoded);
    });
  },

  // Function to decode an encoded string to an object (doesn't verify if the encoded string is valid)
  decode:function (encoded) {
    return new Promise(function (resolve, reject) {
      var decoded = jwt.decode(encoded);
      resolve(decoded);
    });
  },

  // Function to verify if the encoded string is valid
  verify:function (encoded) {
    return new Promise(function (resolve, reject) {
      jwt.verify(encoded, key, function (err, decoded) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
};
}());