import { branch } from "./branch";

export class repo{
    public name : string ;
    public branches : branch[];
    public ownerLogin : string;
    
    constructor(repo:any){
        this.name = repo.name;
        this.ownerLogin = repo.owner.login;
    }
}