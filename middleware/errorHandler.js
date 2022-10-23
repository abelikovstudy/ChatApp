const { log }  = require('./logEvents');

const errorHandler =  (err, req, res, next) => {
    log(
        `${err.name}\t${err.message}`,'errors.txt'
    );
    console.error(err.stack);
    res.status(500).send(err.message);
};

module.exports = errorHandler;