export class User{
    userName:string
    userEmail:string
    password:string

    constructor(userName:string,userEmail: string ,password:string){
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
    }
}