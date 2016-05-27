(function(){
    
      'use strict';

    var Promise = require('bluebird'),
        jwt = require('./utils'),
        database = require('../database/database');
        
      exports.verifySession=function (cookie) {
        return new Promise(function (resolve, reject) {
            jwt.verify(cookie)
                .then(function (token) {
                    database.getUserByToken(token)
                        .then(function (rows) {
                            resolve(rows);
                        })
                        .catch(function (err) {
                            reject(err);
                        });
                })
                .catch(function (err) {
                    reject(err);
                });
        });

    }
}());