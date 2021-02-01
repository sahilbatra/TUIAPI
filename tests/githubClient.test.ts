const axios = require('axios');
import {githubClient}  from "../src/githubClient";
import {user} from '../src/user';


jest.mock('axios');

const userUrl: string = 'https://api.github.com/users/{username}'
const repoUrl: string = 'https://api.github.com/users/{username}/repos'
const branchUrl: string = 'https://api.github.com/repos/{username}/{reponame}/branches'

let svc = new githubClient(userUrl,repoUrl,branchUrl);

describe('POSITIVE:getUser',()=>{
    it('should return user object',async ()=>{
        const githubUserResponse = {
            "data" : {
            "login": "xxxxx"       
          }
        }

          const githubRepoResponse = {"data":[
            {
              
              "name": "xxxxxx", 
              "owner": {
                "login": "xxxxxx"    
              }
            }
          ]
        }

          const githubBranchResponse = {"data" :[
            {
              
              "name": "xxxxx", 
              "commit": {
                "sha": "xxxxx"    
              }
            }
          ]
        }

        axios.get.mockImplementationOnce(() => Promise.resolve(githubUserResponse));
        axios.get.mockImplementationOnce(() => Promise.resolve(githubRepoResponse));
        axios.get.mockImplementationOnce(() => Promise.resolve(githubBranchResponse));

        const userresponse = await svc.getUser('xxxx');
        let userObj = new user(githubUserResponse.data);

        expect(userresponse.login).toEqual('xxxxx');
        
    })
})

