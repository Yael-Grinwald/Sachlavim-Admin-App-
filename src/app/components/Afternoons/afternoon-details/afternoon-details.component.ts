import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Program } from 'src/app/Classes/program';
import { Setting } from 'src/app/Classes/setting';
import { forSelect, MainServiceService } from 'src/app/services/MainService/main-service.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


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
  displayedColumns: string[] = ['check', 'nvSettingName', 'nvAddress', 'lSettingAgegroups'];
  settingList: Array<Setting>;
  lProgramAgegroupsValueForTable: Map<number, string> = new Map<number, string>();

  constructor(public toastr: ToastrService, public datepipe: DatePipe, private mainService: MainServiceService, private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('he');

    this.currentAfternoon = this.mainService.programForDetails;
    this.lProgramAgegroupsValueForTable = mainService.SysTableList[6];
    this.settingList = mainService.settingsList;
    this.dataSource = new MatTableDataSource(this.settingList);
    this.YearTypeValue = mainService.SysTableList[14];
    this.SemesterTypeValue = mainService.SysTableList[16];
    if (this.currentAfternoon.iProgramId == 0) {
      this.typeChanged();
    }


  }

  maxFromDate: Date;
  minFromDate: Date;
  maxToDate: Date;
  minToDate: Date;
  checkValidDate() { }
  typeChanged() {
    debugger
    if (this.currentAfternoon.iSemesterType == 94) {    //סמסטר א

      this.currentAfternoon.dFromDate = this.datepipe.transform(new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 9, 1), 'yyyy-MM-dd');
      this.currentAfternoon.dToDate = this.datepipe.transform(new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType) + 1, 2, 1), 'yyyy-MM-dd');

      this.minFromDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 9, 1);
      this.maxFromDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType) + 1, 2, 14);
      this.minToDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 9, 1);
      this.maxToDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType) + 1, 2, 14);
    }
    else {
      this.currentAfternoon.dFromDate = this.datepipe.transform(new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 2, 1), 'yyyy-MM-dd');
      this.currentAfternoon.dToDate = this.datepipe.transform(new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 7, 1), 'yyyy-MM-dd');

      this.minFromDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 2, 1);
      this.maxFromDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 7, 1);
      this.minToDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 2, 1);
      this.maxToDate = new Date(+this.YearTypeValue.get(this.currentAfternoon.iYearType), 7, 1);
    }


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

  async saveAfternoon() {
    this.currentAfternoon.lProgramAgegroups.splice(0, this.currentAfternoon.lProgramAgegroups.length)
    //  עידכון רשימת הבתי ספר שלא פעיל לפי הרשימה שנבחרה 
    if (this.ProgramAgegroupsListNg.length > 0) {
      for (let age of this.ProgramAgegroupsListNg)//מעבר על הרשימה שנבחרה
      {
        this.currentAfternoon.lProgramAgegroups.push(age.Key);
      }
    }


    this.currentAfternoon.nvProgramName = this.YearTypeValue.get(this.currentAfternoon.iYearType)  + " " +this.SemesterTypeValue.get(this.currentAfternoon.iSemesterType) ;
    this.currentAfternoon.bProgramAfternoon = true;
    this.currentAfternoon.iProgramType = -1;
    if(this.currentAfternoon.iProgramId==0)
    this.currentAfternoon.iProgramId=-1;
    this.currentAfternoon.dFromDate = "/Date(" + new Date(this.currentAfternoon.dFromDate).getTime() + ")/";
    this.currentAfternoon.dToDate = "/Date(" + new Date(this.currentAfternoon.dToDate).getTime() + ")/";

    this.currentAfternoon.tFirstActivity = null;
    this.currentAfternoon.tSecondActivity = null;
    this.currentAfternoon.tFromTimeMorning = null;
    this.currentAfternoon.tToTimeMorning = null;
    this.currentAfternoon.tFromTimeAfternoon = null;
    this.currentAfternoon.tToTimeAfternoon = null;

    let res = <number>await this.mainService.post(
      "ProgramInsertUpdate", { oProgram: this.currentAfternoon, iUserId: this.mainService.currentUser.iUserId }
    );
    this.currentAfternoon.iProgramId = res;
    var lSettingMorning: number[];
    var lSettingNoon: number[];

    this.mainService.post("ProgramSettingsInsertUpdate", {
      iProgramId: this.currentAfternoon.iProgramId,
      lProgramSettings: this.currentAfternoon.lProgramSettings,
      lSettingMorning: lSettingMorning,
      lSettingNoon: lSettingNoon,
      iUserId: this.mainService.currentUser.iUserId
    }).then(
      res => {
        this.toastr.success('השינויים נשמרו בהצלחה', '', {
          timeOut: 3000,
        });
        this.mainService.serviceNavigate("./header-menu/afternoon/afternoon-table");
      },
      err => {
        alert("err ProgramSettingsInsertUpdate")
      }
    )
    res = <number>await this.mainService.post(
      "ProgramInsertUpdate", { oProgram: this.currentAfternoon, iUserId: this.mainService.currentUser.iUserId }
    );
    // this.currentAfternoon.tFirstActivity=this.currentAfternoon.tFirstActivity.toString();
    // this.currentAfternoon.tSecondActivity=this.currentAfternoon.tSecondActivity.toString();
    this.mainService.getAfternoon();


  }

  testDate() {
   
    this.saveAfternoon();
  }


  checkedSettings(settingId: number) {
    //בודק אם כבר קיים
    var index = this.currentAfternoon.lProgramSettings.findIndex(x => x == settingId);

    if (index != -1) {//אם קיים סימן שרוצה להסיר ולכן מוציא מהמערך
      this.currentAfternoon.lProgramSettings.splice(index, 1);
      // alert(this.currentAfternoon.lProgramSettings.length + " remove")
    }
    else {  //אם לא קיים סימן שרוצה להוסיף ולכן מכניס למערך
      this.currentAfternoon.lProgramSettings.push(settingId);
      // alert(this.currentAfternoon.lProgramSettings.length + " add")
    }
  }



  ifChecked(id: number) {
    if (this.currentAfternoon.lProgramSettings.findIndex(x => x == id) == -1)
      return false;
    return true;
  }
}
