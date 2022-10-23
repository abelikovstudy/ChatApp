const express = require('express');
const notfoundRouter = express.Router();
const path = require('path');

notfoundRouter.all('*', (req,res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, '..','views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json(
            {
                error : "404 Not found"
            }
        );
    }
});

module.exports = notfoundRouter;