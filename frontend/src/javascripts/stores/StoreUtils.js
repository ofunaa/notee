var request = require('superagent');

var ajax = {
    get  : function(url, params, callback){
        request
            .get(url)
            .query(params)
            .end(function(err, res){
                callback(err, res);
            });
    },
    post : function(url, params, callback){
        request
            .post(url)
            .send(params)
            .end(function(err, res){
                callback(err, res);
            });
    }
};

module.exports.ajax = ajax;
