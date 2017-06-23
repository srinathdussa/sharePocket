
module.exports = function (config) {

    return {
        login: function (req, res) {
            
            var callback = (err, data) => {
                if (err) {
                    response = { "error": true, "message": "Error fetching data" };
                } else {
                    response = { "error": false, "message": { actors: data } };
                }
                res.json(response);
            }
            config.dbWrapper.getAllActors({}, callback);
            
        }
    
    }
}

