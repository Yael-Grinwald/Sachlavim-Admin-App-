import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Program } from 'src/app/Classes/program';
import { Setting } from 'src/app/Classes/setting';
import { forSelect, MainServiceService } from 'src/app/services/MainService/main-service.service';


@Component({
  selector: 'app-afternoon-details',
  templateUrl: './afternoon-details.component.html',
  styleUrls: ['./afternoon-details.component.css']
})
export class AfternoonDetailsComponent implements OnInit {

  currentAfternoon: Program = new Program();

  lProgramAgegroupsValue: forSelect[] = [];
  ProgramAgegroupsListNg: forSelect[] = [];
  dropdownProgramAgegroups: IDropdownSettings;
  YearTypeValue: Map<number, string> = new Map<number, string>();
  SemesterTypeValue: Map<number, string> = new Map<number, string>();

  //מקור הנתונים לטבלה של המסגרות
  dataSource: MatTableDataSource<Setting>;
  displayedColumns: string[] = ['check', 'nvSettingName', 'nvAddress', 'bActiveAfternoon'];
  settingList: Array<Setting>;
  lProgramAgegroupsValueForTable: Map<number, string> = new Map<number, string>();

  constructor(private mainService: MainServiceService) {
    this.currentAfternoon = this.mainService.programForDetails;
    this.lProgramAgegroupsValueForTable = mainService.SysTableList[6];
    this.settingList = mainService.settingsList;
    this.dataSource = new MatTableDataSource(this.settingList);
    this.YearTypeValue = mainService.SysTableList[14];
    this.SemesterTypeValue = mainService.SysTableList[16];
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.lProgramAgegroupsValue = this.mainService.gItems[6].dParams;
    // איתחול רשימת הגילאים של התוכנית 
    if (this.currentAfternoon.lProgramAgegroups.length > 0) {
      for (let nlId of this.currentAfternoon.lProgramAgegroups) {
        this.ProgramAgegroupsListNg.push(this.lProgramAgegroupsValue.find(x => x.Key == nlId));
      }
    }

//  this.currentAfternoon.dFromDate;
//  this.currentAfternoon.dToDate= new Date(this.currentAfternoon.dToDate).toLocaleDateString() ;
//  alert(  this.currentAfternoon.dToDate)
    this.currentAfternoon.tFirstActivity = new Date(parseInt(this.currentAfternoon.tFirstActivity.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toLocaleTimeString();
    this.currentAfternoon.tSecondActivity = new Date(parseInt(this.currentAfternoon.tSecondActivity.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toLocaleTimeString();

    //הגדרות ה multi select
    this.dropdownProgramAgegroups = {
      singleSelection: false,
      idField: 'Key',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.ngAfterViewInit();

  }

  saveAfternoon() {
    alert(this.currentAfternoon.iProgramId)
    this.currentAfternoon.lProgramAgegroups.splice(0, this.currentAfternoon.lProgramAgegroups.length)
    //  עידכון רשימת הבתי ספר שלא פעיל לפי הרשימה שנבחרה 
    if (this.ProgramAgegroupsListNg.length > 0) {
      for (let age of this.ProgramAgegroupsListNg)//מעבר על הרשימה שנבחרה
      {
        this.currentAfternoon.lProgramAgegroups.push(age.Key);
      }
    }
    // var lSettingMorning: number[];
    // var lSettingNoon: number[];

    // this.mainService.post("ProgramSettingsInsertUpdate", { 
    //   iProgramId: this.currentAfternoon.iProgramId, 
    //   lProgramSettings: this.currentAfternoon.lProgramSettings,
    //   lSettingMorning: lSettingMorning,
    //   lSettingNoon: lSettingNoon,
    //   iUserId: this.mainService.currentUser.iUserId}).then(
    //   res => {
    //     alert("suc")
    //   },
    //   err => {
    //     alert("err ProgramSettingsInsertUpdate")
    //   }
    // )
     
    this.currentAfternoon.tFirstActivity=this.currentAfternoon.tFirstActivity.toString();
    this.currentAfternoon.tSecondActivity=this.currentAfternoon.tSecondActivity.toString();

    debugger;
    this.mainService.post("ProgramInsertUpdate", { oProgram: this.currentAfternoon, iUserId: this.mainService.currentUser.iUserId }).then(
      res => {
        this.mainService.getAfternoon();
        alert("update " + this.currentAfternoon.nvProgramName + " done!");
        this.mainService.serviceNavigate("/header-menu/afternoon/afternoon-table");
      },
      err => {
        alert("saveAfternoon err\nצריך לסדר את השעה והתאריך");
      }
    )
    //לאחר שעידכנו מיסגרת צריך לישלוף מחדש מהסרויס את המיסגרת המעודכנת.
    this.mainService.getAfternoon();
  }

  testDate() {
    // if (this.currentAfternoon.iProgramId > -1 && (this.currentAfternoon.dFromDate > $scope.dFromDate || this.currentAfternoon.dToDate < $scope.dToDate))
    //   alert("שים לב  <br />בשמירה ימחקו הפעילויות שהוגדרו מחוץ לטווח התאריכים שצומצם <br /> האם בכל אופן הינך מעונין לשמור ?" + "אזהרה")
    // function () { $scope.saveProgram(); }, function () { return; });
    // else
    this.saveAfternoon();
  }

  //בינתיים
  onItemSelect(item: Program) {
    //this.operator.lSchoolsExcude.push(item.iSettingId);//הוספה לרשימה של האופרטור
    console.log(item);
    //console.log(this.ProgramAgegroupsListNg);
  }
  OnItemDeSelect(item: Program) {
    //this.operator.lSchoolsExcude.splice(item.iSettingId, 1);//מחיקה מהרשימה של האופרטור

    console.log(item);
    //console.log(this.ProgramAgegroupsListNg);
  }
  onSelectAll(items: any) {

    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  checkedSettings(settingId: number) {
    //בודק אם כבר קיים
    var index = this.currentAfternoon.lProgramSettings.findIndex(x => x == settingId);

    if (index != -1) {//אם קיים סימן שרוצה להסיר ולכן מוציא מהמערך
      this.currentAfternoon.lProgramSettings.splice(index, 1);
      alert(this.currentAfternoon.lProgramSettings.length + " remove")
    }
    else {  //אם לא קיים סימן שרוצה להוסיף ולכן מכניס למערך
      this.currentAfternoon.lProgramSettings.push(settingId);
      alert(this.currentAfternoon.lProgramSettings.length + " add")
    }
  }

  removeAlSetting() {
    //צריך לטפל במקרה הזה
    if (confirm("שים לב" + "\n" + "באם תשמור שינוי זה ימחקו כל הפעילויות המשובצות למסגרת זו לצהריים בתוכנית זו ובשאר תוכניות" + "\n האם אתה בטוח?"))
      alert("נמחק")
  }

  ifChecked(id: number) {
    if (this.currentAfternoon.lProgramSettings.findIndex(x => x == id) == -1)
      return false;
    return true;
  }
}
