import { repo } from "./repo";

export class user{
    public login : string ;
    public repos : repo[];

    constructor(user : any){
        this.login = user.login;
    }
}