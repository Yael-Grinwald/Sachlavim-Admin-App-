import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { da } from 'date-fns/locale';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Program } from 'src/app/Classes/program';
import { Setting } from 'src/app/Classes/setting';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})

export class ProgramDetailsComponent implements OnInit {

  lProgramAgegroupsValue: forSelect[] = [];
  ProgramAgegroupsListNg: forSelect[] = [];
  dropdownProgramAgegroups: IDropdownSettings;


  currentProgram: Program = new Program();
  formProgram: FormGroup;
  lProgramTypeValue: forSelect[] = [];

  //מקור הנתונים לטבלה של המסגרות
  dataSource: MatTableDataSource<Setting>;
  displayedColumns: string[] = ['check', 'nvSettingName', 'nvAddress', 'lSettingAgegroups'];
  settingList: Array<Setting>;
  lProgramAgegroupsValueForTable: Map<number, string> = new Map<number, string>();
  elementRef: any;
  datePickerCtrl = new FormControl();
  toDayHebrewDay: any;
  constructor(public datepipe: DatePipe, private dateAdapter: DateAdapter<any>, public toastr: ToastrService, private mainService: MainServiceService) {

    this.dateAdapter.setLocale('he');
    this.currentProgram = this.mainService.programForDetails;
    debugger
    this.lProgramTypeValue = mainService.gItems[9].dParams;
    this.lProgramAgegroupsValueForTable = mainService.SysTableList[6];
    this.settingList = mainService.settingsList;
    this.dataSource = new MatTableDataSource(this.settingList);
    this.typeChanged();

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
    if (this.currentProgram.lProgramAgegroups.length > 0) {
      for (let nlId of this.currentProgram.lProgramAgegroups) {
        this.ProgramAgegroupsListNg.push(this.lProgramAgegroupsValue.find(x => x.Key == nlId));
      }
    }

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

    this.currentProgram.tFromTimeMorning = new Date(parseInt(this.currentProgram.tFromTimeMorning.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toString();
    this.currentProgram.tToTimeMorning = new Date(parseInt(this.currentProgram.tToTimeMorning.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toString();
    this.currentProgram.tFromTimeAfternoon = new Date(parseInt(this.currentProgram.tFromTimeAfternoon.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toString();
    this.currentProgram.tToTimeAfternoon = new Date(parseInt(this.currentProgram.tToTimeAfternoon.replace(/\/+Date\(([\d+-]+)\)\/+/, '$1'))).toString();

    this.ngAfterViewInit();

  }
  Hebcal = require('hebcal');
  rightFromDate: string = null;
  rightToDate: string = null;

  maxFromDate: Date = new Date();
  minFromDate: Date;
  maxToDate: Date;
  minToDate: Date;

  typeChanged() {
    debugger
    //30  קייטנת חנוכה 
    //31 פסח
    //32 קיץ
    if (this.currentProgram.iProgramType == 30) {
      if (!(new Date(this.currentProgram.dFromDate) >= new Date(2021, 10, 5) && new Date(this.currentProgram.dFromDate) <= new Date(2021, 11, 6))) {
        this.currentProgram.dFromDate = this.datepipe.transform(new Date(2021, 10, 5), 'yyyy-MM-dd');
      }
      if (!(new Date(this.currentProgram.dToDate) >= new Date(2020, 10, 5) && new Date(this.currentProgram.dToDate) <= new Date(2021, 11, 6))) {
        this.currentProgram.dToDate = this.datepipe.transform(new Date(2021, 11, 6), 'yyyy-MM-dd');
      }

      this.minFromDate = new Date(2021, 10, 5);
      this.maxFromDate = new Date(2021, 11, 6);
      this.minToDate = new Date(2021, 10, 5);
      this.maxToDate = new Date(2021, 11, 6);
    }
    else {
      if (this.currentProgram.iProgramType == 31) {
        if (!(new Date(this.currentProgram.dFromDate) >= new Date(2022, 3, 2) && new Date(this.currentProgram.dFromDate) <= new Date(2022, 4, 1))) {
          this.currentProgram.dFromDate = this.datepipe.transform(new Date(2022, 3, 2), 'yyyy-MM-dd');
        }
        if (!(new Date(this.currentProgram.dToDate) >= new Date(2022, 3, 2) && new Date(this.currentProgram.dToDate) <= new Date(2022, 4, 1))) {
          this.currentProgram.dToDate = this.datepipe.transform(new Date(2022, 4, 1), 'yyyy-MM-dd');
        }

        // this.currentProgram.dFromDate = this.datepipe.transform(new Date(2022, 3, 2), 'yyyy-MM-dd');
        // this.currentProgram.dToDate = this.datepipe.transform(new Date(2022, 4, 1), 'yyyy-MM-dd');

        this.minFromDate = new Date(2022, 3, 2);
        this.maxFromDate = new Date(2022, 4, 1);
        this.minToDate = new Date(2022, 3, 2);
        this.maxToDate = new Date(2022, 4, 1);
      }
      else {
        if (this.currentProgram.iProgramType == 32) {
          if (!(new Date(this.currentProgram.dFromDate) >= new Date(2021, 6, 1) && new Date(this.currentProgram.dFromDate) <= new Date(2021, 7, 31))) {
            this.currentProgram.dFromDate = this.datepipe.transform(new Date(2021, 6, 1), 'yyyy-MM-dd');
          }
          if (!(new Date(this.currentProgram.dToDate) >= new Date(2021, 6, 1) && new Date(this.currentProgram.dToDate) <= new Date(2021, 7, 31))) {
            this.currentProgram.dToDate = this.datepipe.transform(new Date(2021, 7, 31), 'yyyy-MM-dd');
          }

          // this.currentProgram.dFromDate = this.datepipe.transform(new Date(2022, 3, 2), 'yyyy-MM-dd');
          // this.currentProgram.dToDate = this.datepipe.transform(new Date(2022, 4, 1), 'yyyy-MM-dd');
          this.minFromDate = new Date(2021, 6, 1);
          this.maxFromDate = new Date(2021, 7, 31);
          this.minToDate = new Date(2021, 6, 1);
          this.maxToDate = new Date(2021, 7, 31);
        }
      }
    }

    debugger
  }

  checkValidDate(fromTo: number, date: Date) {
debugger
    this.minToDate = new Date(this.currentProgram.dFromDate);
    this.currentProgram.dToDate = date.toString();

    debugger

    // //  date= new Date(5780, 5, 7, new HebrewCalendar())
    // let newDate = new Date(date);

    // //בדיקת תאריך קייטנת חנוכה, 23/3
    // if (this.currentProgram.iProgramType == 30) {

    //   //get the hebrew date
    //   let day = new this.Hebcal.HDate(newDate);
    //   //if not Kislev month
    //   if (day.getMonth() != 3) {
    //     if (fromTo == 1)// אם תאריך התחלתי
    //     {
    //       // date =  this.Hebcal.HDate.hebrew2abs('1 Kislev');
    //       this.rightFromDate = "נא הזן תאריך בחודש כסליו"
    //     }
    //     else {
    //       this.rightToDate = "נא הזן תאריך בחודש כסליו"
    //     }

    //   }

    debugger

    //convert the number date to letters 
    // return this.Hebcal.gematriya(day.getDate());et rightFromDate;
  }





  async saveProgram() {
    this.currentProgram.lProgramAgegroups.splice(0, this.currentProgram.lProgramAgegroups.length)
    //  עידכון רשימת הבתי ספר שלא פעיל לפי הרשימה שנבחרה 
    if (this.ProgramAgegroupsListNg.length > 0) {
      for (let age of this.ProgramAgegroupsListNg)//מעבר על הרשימה שנבחרה
      {
        this.currentProgram.lProgramAgegroups.push(age.Key);
      }
    }
    if (this.currentProgram.tFromTimeMorning != null)
      this.currentProgram.tFromTimeMorning = this.currentProgram.tFromTimeMorning.toString();
    if (this.currentProgram.tToTimeMorning != null)
      this.currentProgram.tToTimeMorning = this.currentProgram.tToTimeMorning.toString();
    if (this.currentProgram.tFromTimeAfternoon != null)
      this.currentProgram.tFromTimeAfternoon = this.currentProgram.tFromTimeAfternoon.toString();
    if (this.currentProgram.tToTimeAfternoon != null)
      this.currentProgram.tToTimeAfternoon = this.currentProgram.tToTimeAfternoon.toString();

    this.currentProgram.dFromDate = "/Date(" + new Date(this.currentProgram.dFromDate).getTime() + ")/";
    this.currentProgram.dToDate = "/Date(" + new Date(this.currentProgram.dToDate).getTime() + ")/";
    //   this.currentProgram.dToDate="/Date(1530910800000+0300)/";

    //   let da=this.currentProgram.dToDate+"T00:00:00";
    //   let g:string;
    //   g=new Date(this.currentProgram.dFromDate).getTime()+"";
    console.log(this.currentProgram);

    // this.mainService.post("ProgramInsertUpdate", { oProgram: this.currentProgram, iUserId: this.mainService.currentUser.iUserId }).then(
    //   res => {

    //     this.toastr.success('השינויים נשמרו בהצלחה', '', {
    //       timeOut: 3000,
    //     });
    //     this.mainService.serviceNavigate("./header-menu/programs/programs-table");

    //   },
    //   err => {
    //     alert("saveProgram err");
    //   }
    // )
    debugger
    this.currentProgram.tFirstActivity = null;
    this.currentProgram.tSecondActivity = null;
    this.currentProgram.tFromTimeMorning = null;
    this.currentProgram.tToTimeMorning = null;
    this.currentProgram.tFromTimeAfternoon = null;
    this.currentProgram.tToTimeAfternoon = null;


    let res = <number>await this.mainService.post(
      "ProgramInsertUpdate", { oProgram: this.currentProgram, iUserId: this.mainService.currentUser.iUserId }
    );
    this.currentProgram.iProgramId = res;
    var lSettingMorning: number[];
    var lSettingNoon: number[];

    this.mainService.post("ProgramSettingsInsertUpdate", {
      iProgramId: this.currentProgram.iProgramId,
      lProgramSettings: this.currentProgram.lProgramSettings,
      lSettingMorning: lSettingMorning,
      lSettingNoon: lSettingNoon,
      iUserId: this.mainService.currentUser.iUserId
    }).then(
      res => {

        this.toastr.success('השינויים נשמרו בהצלחה', '', {
          timeOut: 3000,
        });
        this.mainService.serviceNavigate("./header-menu/programs/programs-table");

        // alert(res)
      },
      err => {
        alert("err ProgramSettingsInsertUpdate")
      }
    )
    res = <number>await this.mainService.post(
      "ProgramInsertUpdate", { oProgram: this.currentProgram, iUserId: this.mainService.currentUser.iUserId }
    );

    //לאחר שעידכנו מיסגרת צריך לישלוף מחדש מהסרויס את המיסגרת המעודכנת.
    this.mainService.getPrograms();
  }

  selected: boolean = false;
  isSelected(s: any) {

    this.selected = this.selected = this.currentProgram.lProgramAgegroups.includes(s)
    return true;
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
    var index = this.currentProgram.lProgramSettings.findIndex(x => x == settingId);

    if (index != -1) {//אם קיים סימן שרוצה להסיר ולכן מוציא מהמערך
      this.currentProgram.lProgramSettings.splice(index, 1);
      // alert(this.currentProgram.lProgramSettings.length + " remove")
    }
    else {  //אם לא קיים סימן שרוצה להוסיף ולכן מכניס למערך
      this.currentProgram.lProgramSettings.push(settingId);
      // alert(this.currentProgram.lProgramSettings.length + " add")
    }
    debugger
  }
  removeAlSetting() {
    //צריך לטפל במקרה הזה
    if (confirm("שים לב" + "\n" + "באם תשמור שינוי זה ימחקו כל הפעילויות המשובצות למסגרת זו לצהריים בתוכנית זו ובשאר תוכניות" + "\n האם אתה בטוח?"))
      alert("נמחק")
  }
  ifChecked(id: number) {
    if (this.currentProgram.lProgramSettings.findIndex(x => x == id) == -1)
      return false;
    return true;
  }
  h: boolean = false;

  checkFormValid() {
    //check if no mat-hint with context 
    const list = document.querySelectorAll<HTMLInputElement>("mat-hint");

    list.forEach(function (Item) {
      if (Item.innerHTML != '') {
        debugger

        alert('נא שים לב לתוכן תקין');
        this.h = true;
        return false
      }
    });
    debugger
    if (new Date(this.currentProgram.dFromDate) >= new Date(this.currentProgram.dToDate)) {
      debugger
      alert('הזן תאריך התחלה לפני תאריך סיום');
      this.h = true;
      return false;
    }
    debugger

    if (this.h == false) {
      this.saveProgram();
    }
    this.h = false;
  }
}
