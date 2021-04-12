import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { Operator } from 'src/app/classes/operator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Setting } from 'src/app/Classes/setting';
import { Program } from 'src/app/Classes/program';
import { promise } from 'protractor';


export class forSelect {
  Key: number;
  Value: string;
  constructor(key: number, value: string) {
    this.Key = key;
    this.Value = value;
  }
}

@Injectable({
  providedIn: 'root'
})


export class MainServiceService {


  constructor(private router: Router, private http: HttpClient) {

    this.globalObj();
    this.getSettings();
    
    this.getAllOperators();
    this.getPrograms();
    this.getAfternoon();
    this.getUsers();

    
  }

  gItems: any = [];

  operatorsList: Operator[] = [];
  settingsList: Setting[] = [];
  programsList: Program[] = [];
  afternoonsList: Program[] = [];
  usersList: User[] = [];
  //משתמש שנכנס למערכת
  currentUser: User = new User();
  // לעריכת מפעיל
  operatorForDetails: Operator = new Operator();
  //לעריכת מסגרת
  settingForDetails: Setting = new Setting();

  //לעריכת תוכנית
  programForDetails: Program;

  //מערך של כל הטבלאות
  SysTableList: Array<Map<number, string>> = new Array<Map<number, string>>();

  sahlavimUrl = "http://localhost:53070/Service1.svc/";//שרת מקומי
 // sahlavimUrl = "http://qa.webit-track.com/SachlavimQA/Service/Service1.svc/";//שרת מרוחק

 codeTables ={
  userPermissions:
  {
      director: 1,
      secretary: 2
  },
  userStatus:
  {
      active: 3,
      noActive: 4
  },
  OperatorTypes:
  {
      private: 5,
      company: 6,
      employee: 7
  },
  paymentConditions:
  {
      swift30: 8,
      swift60: 9,
      Cash: 10
  },
  SettingType:
  {
      garden: 17,
      school: 18
  },
  ScheduleOperators:
  {
      SummerCamp: 29,
      TheAfternoon: 28
  },
  Camp:
  {
      Chanukah: 30,
      Passover: 31,
      Summer: 32
  },
  MessageType:
  {
      sms: 33,
      email: 35
  },
  ActivityStatus:
  {
      done:48,
      noDone:49,
      absence:50
  }
};

 async post(url: string, data: any): Promise<any> {
    return this.http.post(`${this.sahlavimUrl}${url}`, data).toPromise();
  }

  async get(url: string): Promise<any> {
    return await this.http.get(`${this.sahlavimUrl}${url}`).toPromise();
  }

  getPrograms() {
    //פונקציה המחזירה לתוך אובייקט את נתוני טבלת SysTable
    this.post("ProgramsGet", { bProgramAfternoon: false || null }).then(
      res => {
        if (res) {
          this.programsList = res;
          for (let p of this.programsList) {
            p.dFromDate = new Date(parseInt(p.dFromDate.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toJSON().slice(0, 10);
            p.dToDate = new Date(parseInt(p.dToDate.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toJSON().slice(0, 10);
            // p.tFromTimeAfternoon=new Date(parseInt(p.tFromTimeAfternoon.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toDateString();
          }
        }
      },
      err => {
        alert("ProgramsGet err")
      }
    );
  }

  getAfternoon() {
    this.post("ProgramsGet", { bProgramAfternoon: true }).then(
      res => {
        if (res) {
          this.afternoonsList = res;
          for (let p of this.afternoonsList) {
            p.dFromDate = new Date(parseInt(p.dFromDate.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toJSON().slice(0, 10);
            p.dToDate = new Date(parseInt(p.dToDate.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toJSON().slice(0, 10);
            //  alert(p.dToDate[1])
            //   if (this.YearTypeValue.get(p.iYearType) != p.dToDate[3]) {

            //   }
            // p.tFromTimeAfternoon=new Date(parseInt(p.tFromTimeAfternoon.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toDateString();
          }

        }
      },
      err => {
        alert("getAfternoon err")
      }
    );

  }
  //get operator list from server
  getAllOperators() {

    this.post("GetOperators", {})
      .then(
        res => {
          this.operatorsList = res;
          debugger
          //Delete duplicates valus from schollexcude list in each operator
          this.operatorsList.forEach(element => {
            element.lSchoolsExcude = element.lSchoolsExcude.filter(
              function (elem, index, self) {
                return index === self.indexOf(elem)
              });
          });

          //Delete duplicates valus from neighborhoods list in each operator
          this.operatorsList.forEach(element => {
            element.lNeighborhoods = element.lNeighborhoods.filter(
              function (elem, index, self) {
                return index === self.indexOf(elem)
              });
          });
        }
        , err => {
          alert("err");
        }
      );


  }


  //רשימת המיסגרות
  getSettings() {
    this.post("SettingsGet", {}).then(
      res => {
        this.settingsList = res;
           
      },
      err => {
        alert("SettingsGet err")
      }
    );
  }

  getUsers() {
    this.post("GetUsers", {})
      .then(
        res => {
          //if (res) {
            this.usersList = res;
             
            // this.usersList.forEach(element => {
            //   switch(element.iUserType)
            //   {
            //     case 1:
            //   }
            // });
          //}
          // else
          //   alert("GetUsers management error");
        },
        err => {
          alert("error");
        }
      );
  }
  serviceNavigate(path: string) {
    this.router.navigate([path]);
  }

  serviceNavigateForId(path: string, id: number) {
    this.router.navigate([path, id]);
  }

   //get the system tables from server
  globalObj() {
    this.post("SysTableListGet", {}).then(
      res => {
        this.gItems = res;
        //create map array for each table for saving the parameters in Angular format
        this.gItems.forEach(g => {
          //במערך של הטבלאות MAP עבור כל טבלה יצירת 
          //בפורמט מתאים לאנגולר 8 PARAMS בשביל שמירת הנתונים של 
          this.SysTableList[g.iListId - 1] = new Map<number, string>();
          //שלה PARAMS לכל טבלה עובר על 
          //KEY,VALUE את הנתונים בצורה של MAP ומכניס לתוך ה
          //MAP ומכניס את ה
          //של הטבלה ID למערך במקום של ה
          g.dParams.forEach(p => {
            this.SysTableList[g.iListId - 1].set(p.Key, p.Value);
          });
        });
      },
      err => {
        alert("globalObj err");
      }
    )
  }

  updateCurrentOp(id:number){
      
    this.post('GetOperator',{ iOperatorId: id }).then(
      res => {
        this.operatorForDetails = res;
        
      },
      err => {
        alert(err);
      }
    );
      
  }

}