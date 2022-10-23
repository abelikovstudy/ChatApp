const { format } = require('date-fns');
const { v4 : uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const log = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'yyyyddMM\tHH:mm:ss')}`;
    const logInfo = `${dateTime}\t${uuid()}\t${message}\n`;

    try{
        if(!fs.existsSync(path.join(__dirname, '../logs')))
        {
            await fsPromises.mkdir(path.join(__dirname, '../logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '../logs', fileName), logInfo);
    }
    catch(error){
        console.log(error);
    }
};

const logger = (req, res, next) =>{
    log(`${req.method}\t${req.headers.origin}\t${req.url}`, 'logs.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { log, logger };