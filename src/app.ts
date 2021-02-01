import express from 'express';
import { githubClient } from './githubClient';
import { errorManager } from './errors/errorManager';
import { errorStatusCode } from './errors/errorStatusCode';
import config from 'config';


let app = express();



app.listen(config.get('app.port'), () => {
    return console.log('app is running on port ' + (config.get('app.port')))
});

const userApiUrl: string = config.get('urls.userUrl');
const repoApiUrl: string = config.get('urls.repoUrl');
const branchApiUrl: string = config.get('urls.branchUrl');


app.get('/getInfo', async (req, res) => {
    try {
        if(req.headers && req.header('Accept') != 'application/json')
        {           
            await new errorManager().throw({ status: errorStatusCode.invalidAcceptHeader, 
                statusText: "invalid accept header provided" })
     
        }
        if (req.query.username) {
            let svc = new githubClient(userApiUrl,repoApiUrl,branchApiUrl);
            let username: string = req.query.username.toString();
            var user = await svc.getUser(username);
            res.send(user);
        }
        else {
            await new errorManager().throw({ status: errorStatusCode.BadRequest,
                 statusText: "username not provided in query params" })
        }
    }
    catch (error) {     
        res.status(error.statusCode).send(error);
    }
})


