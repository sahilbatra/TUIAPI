const axios = require('axios');
import { branch } from './branch';
import { errorManager } from './errors/errorManager';
import { repo } from './repo';
import { user } from './user';

const OPTIONS: any = {
    headers: {
        'User-Agent': 'request'
    },
    json: true

}

export class githubClient {
    userUrl: string
    repoUrl: string 
    branchUrl: string
    constructor(userUrl, repoUrl, branchUrl)
    {
        this.userUrl=userUrl;
        this.repoUrl=repoUrl;
        this.branchUrl=branchUrl;
    }
    async getUser(username: string): Promise<user> {
  
        let userObj: user = null;
        try {
            const getUserApiUrl = this.userUrl.replace('{username}', username);
            const response = await axios.get(getUserApiUrl,OPTIONS);
         
            if (response && response.data) {
                
                userObj = new user(response.data);             
                userObj.repos = await this.getRepos(userObj);
            }
            return userObj;
        }
        catch (error) {
           
            await new errorManager().throw(error);
        }
    }

    async getRepos(user: user): Promise<repo[]> {
        let repos: repo[];
        const getRepoApiUrl = this.repoUrl.replace('{username}', user.login);
        const response = await axios.get(getRepoApiUrl,OPTIONS);       
       
        if (response && response.data) {
            
            repos = await Promise.all(response.data.map(async (resonseData: any) => {
                const repoObj = new repo(resonseData);
                if (repoObj) {
                    repoObj.branches = await this.getBranches(user, repoObj);
                }
                return repoObj;
            }));
        }
      
        return repos;
    }

    async getBranches(user: user, repo: repo): Promise<branch[]> {
        let branches: branch[];
        const getBranchApiUrl = this.branchUrl.replace('{username}', user.login).replace('{reponame}', repo.name);
       
        const response = await axios.get(getBranchApiUrl,OPTIONS);
     
        if (response && response.data) {
            branches = response.data.map((responseData: any) => new branch(responseData))
        }
        return branches;
    }
}