import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mainService: MainServiceService) { }

  hide = true;
  enterByUserName: boolean = true;
  user: User = new User();
  currentUser: User = new User();
  usersList: Array<User> = new Array<User>();
  formLogin: FormGroup;
  userExist: boolean = false;
  spinnerWork: boolean = false;

  ngOnInit() {
    this.UserLoginControls();
    this.GetUsers();

  }

  // Login to site
  Login() {
    this.user = this.formLogin.value;
    //חיפוש המשתמש הזה בתוך הרשימה
    if (this.user) {
      this.currentUser = this.usersList.find(u => u.nvUserName == this.user.nvUserName && u.nvPassword == this.user.nvPassword);
      if (this.currentUser)//אם שם והסיסמה נכונים
      {
        //שנכנס לשמירה בסרויס user שליחה של ה
        this.mainService.currentUser = this.currentUser
        this.UserLogin(this.user.nvUserName, this.user.nvPassword, this.user.nvMail);//  עידכון היוזר הנוכחי בשרת 
        this.mainService.serviceNavigate("header-menu");
      }
      else {

        alert("שם וסיסמה אינם תקינים");
      }
    }

  }

  GetUsers() {
    this.mainService.post("GetUsers", {})
      .then(
        res => {
          this.usersList = res;
        },
        err => {
          alert(err + "get users err");
        }
      );
  }


  UserLogin(UnvUserName: string, UnvPassword: string, UnvMail: string) {
    this.mainService.post("UserLogin", { nvUserName: UnvUserName, nvPassword: UnvPassword, nvMail: UnvMail })
      .then(
        res => {
          if (res.iUserId)
            this.userExist = true;

          else {
            alert("userLogin error");
            this.userExist = false;
          }
        },
        err => {
          alert("err")
          this.userExist = false;
        }
      );
  }
  
  forgot: boolean = false;


  //שליחת מייל לאיפוס הסיסמא
  sentMailToResetPassword(mail: string) {
    this.spinnerWork = true;
    this.user.nvPassword = null;
    this.mainService.post("UserReset", { nvMail: mail }).then
      (
        res => {
          this.spinnerWork = false;
          if (!res.iUserId) {
            alert("לא קים מייל זה")
          }
          else {
            this.forgot = false;
            alert("סיסמתך נשלחה בהצלחה!")
          }
        },
        err => {
          alert("err UserReset")
        }
      )

  }

  UserLoginControls() {
    this.formLogin = new FormGroup({
      nvUserName: new FormControl(this.user.nvUserName),
      nvPassword: new FormControl(this.user.nvPassword),
      nvMail: new FormControl(this.user.nvMail)
    });
  }

  get nvUserName() {
    return this.formLogin.get("nvUserName");
  }
  get nvPassword() {
    return this.formLogin.get("nvPassword");
  }
  get nvMail() {
    return this.formLogin.get("nvMail");
  }
}
