
const whitelist = ['http://localhost:3500'];
const corsOptions = {
    origin : (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else{
            callback(new Error('CORS restricted that host'))
        }
    },
        optionsSuccessStatus : 200
}

module.exports = corsOptions;