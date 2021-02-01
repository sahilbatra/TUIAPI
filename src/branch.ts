export class branch{
    public name : string;
    public lastCommit : string;

    constructor(branch:any){
        this.name = branch.name;
        this.lastCommit = branch.commit.sha;
    }
}