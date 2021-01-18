
export class User {
   
    constructor( public iUserId: number=-1,
    public nvFirstName: string="",
    public nvLastName: string="",
    public nvMobile: string="",
    public nvMail: string="",
    public nvUserName: string="",
    public nvPassword: string="",
    public iUserType: number=-1,
    public iUserStatus: number=-1) {
     
    }
}