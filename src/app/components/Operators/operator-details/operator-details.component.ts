import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operator } from 'src/app/classes/operator';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';
import { MatCheckboxModule, MatDialog } from '@angular/material'
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Setting } from 'src/app/Classes/setting';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { operatorsAvailability } from 'src/app/Classes/operatorsAvailability';
import { Activity } from 'src/app/classes/activity';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { de } from 'date-fns/locale';

export class ItimesArray {
  fromTimeMorning: Date = new Date();
  toTimeMorning: Date = new Date();
}
@Component({
  selector: 'app-operator-details',
  templateUrl: './operator-details.component.html',
  styleUrls: ['./operator-details.component.css']
})

export class OperatorDetailsComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  dropdownNeighborhoods: IDropdownSettings;
  operatorsAvailability: operatorsAvailability[] = [];

  modelContent: number = 0;
  modelTitle = [
    'לו"ז צהרונים', 'לו"ז קייטנת קיץ', 'לו"ז קייטנת חנוכה', 'לו"ז קייטנת פסח'
  ]

  timesArray: ItimesArray[] = [];
  //רשימת שכונות
  NeighborhoodsList: forSelect[] = [];
  operatorNeighborhoods: forSelect[] = [];
  activityCategories: forSelect[] = [];


  DetailsForm: FormGroup;
  operator: Operator;
  blNeighborhoods: boolean;//פעיל באיזורים מסויימים
  bSettingslsExclude: boolean;//לא פעיל במיסגרות מסויימות
  schoolListforTalan: Setting[] = [];//רשימת בתי הספר לחוגי תל"ן
  lschool: Setting[] = [];//בתי הספר בהם מפעיל מפעיל חוגי תל"ן
  schoolsExcludeList: Setting[] = [];//רשימת המיסגרות בהן המפעיל לא פעיל
  settingsList: Setting[] = [];//רשימת המיסגרות
  newOp: boolean = true;
  iCategory: number = 0;
  mat: ElementRef;
  isValid: boolean = false;
  Activities: Activity[] = [];
  constructor(private route: ActivatedRoute, private mainService: MainServiceService, private elementRef: ElementRef, public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(MessageDialogComponent);
  }

  ngOnInit() {


    this.operator = this.mainService.operatorForDetails;//פרטי המפעיל לטופס עריכה
    this.settingsList = this.mainService.settingsList;
    this.activityCategories = this.mainService.gItems[7].dParams;

    //find id category of operator activities
    if (this.operator.lActivity.length > 0) {
      this.iCategory = this.operator.lActivity[0].iCategoryType;
      this.operator.nvActivityies = this.activityCategories.find(x => x.Key == this.iCategory).Value;
    }
    else {
      this.activityCategories.forEach(element => {
        this.iCategory = this.operator.nvActivityies.includes(element.Value) ? element.Key : this.iCategory;
      });
    }



    //אתחול רשימת איזורים
    this.NeighborhoodsList = this.mainService.gItems[4].dParams;

    //שליפת רשימת מיסגרות מסוג ביה"ס- לחוגי תל"ן
    this.schoolListforTalan = this.settingsList.filter(x => x.iSettingType === 18);

    //Check if is not new operator
    if (this.operator.iOperatorId != -1) {
      this.newOp = false;

      this.mainService.post("OperatorsAvailabilityGet", { iOperatorId: this.operator.iOperatorId }).then(
        res => {
          this.operatorsAvailability = res;
          debugger

        },
        err => {
          alert(err);
        }
      );

      this.blNeighborhoods = this.operator.lNeighborhoods.length > 0 ? true : false;//ממלא את הרשימה אם פעיל באיזורים מסויימים
      this.bSettingslsExclude = this.operator.lSchoolsExcude.length > 0 ? true : false;//מלוי רשימה אם לא פועל במיסגרות מסויימות

      if (this.operator.lSchools.length > 0)//talan schools where actives, for ngModel      
      {
        for (let schoolId of this.operator.lSchools)
          this.lschool.push(this.settingsList.find(x => x.iSettingId == schoolId));
      }

      // איתחול רשימת schoolsExcludeList של מפעיל 
      if (this.operator.lSchoolsExcude.length > 0) {
        for (let schoolId of this.operator.lSchoolsExcude) {
          this.schoolsExcludeList.push(this.settingsList.find(x => x.iSettingId == schoolId));
        }
      }


      // איתחול רשימת איזוריםשל מפעיל 
      if (this.operator.lNeighborhoods.length > 0) {
        for (let nlId of this.operator.lNeighborhoods) {
          this.operatorNeighborhoods.push(this.NeighborhoodsList.find(x => x.Key == nlId));
        }
      }
    }

    //הגדרות ה multi select
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'iSettingId',
      textField: 'nvSettingName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    //הגדרות ה multi select
    this.dropdownNeighborhoods = {
      singleSelection: false,
      idField: 'Key',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  daysNames = [
    'ראשון',
    'שני',
    'שלישי',
    'רביעי',
    'חמישי'
  ];
  availability: operatorsAvailability[] = [];
  createNoonsArray(type: number) {
    this.availability = this.operatorsAvailability.filter(x => x.iOperatorId == this.operator.iOperatorId && x.iOperatorAvailabilityType == type);
    debugger
    this.availability.forEach((element) => {
      element.tMorningToTime = element.tMorningToTime.replace('.', ':');
      element.tMorningFromTime = element.tMorningFromTime.replace('.', ':');
      element.tAfternoonFromTime = element.tAfternoonFromTime.replace('.', ':');
      element.tAfternoonToTime = element.tAfternoonToTime.replace('.', ':');
      //set time to 00:00 template
      if (element.tMorningFromTime[1] == ':') {
        element.tMorningFromTime = '0' + element.tMorningFromTime;
      }
      if (element.tMorningToTime[1] == ':') {
        element.tMorningToTime = '0' + element.tMorningToTime;
      }
      if (element.tAfternoonFromTime[1] == ':') {
        element.tAfternoonFromTime = '0' + element.tAfternoonFromTime;
      }
      if (element.tAfternoonToTime[1] == ':') {
        element.tAfternoonToTime = '0' + element.tAfternoonToTime;
      }

      if (element.tMorningFromTime.length == 4) {
        element.tMorningFromTime += '0';
      }
      if (element.tMorningToTime.length == 4) {
        element.tMorningToTime += '0';
      }
      if (element.tAfternoonFromTime.length == 4) {
        element.tAfternoonFromTime += '0';
      }
      if (element.tAfternoonToTime.length == 4) {
        element.tAfternoonToTime += '0';
      }
    });
    debugger
  }

  modal: boolean = true;
  showCategoryModal(event: any) {
    if (this.operator.iOperatorId != -1) {
      this.modal = true;
    }
  }
  h: boolean = false;

  checkFormValid() {
    //check if no mat-hint with context 
    const dom: HTMLElement = this.elementRef.nativeElement;
    const list = document.querySelectorAll('.mat-hint');

    list.forEach(function (Item) {
      if (Item.innerHTML != '') {
        debugger
        alert('נא שים לב לתוכן תקין');
        this.h = true;
        return false
      }
    });



    if (this.h == false) {
      this.save()
    }
  }

  abilitySave() {
    debugger
    this.mainService.post("OperatorsAvailabilityUpdt", { iOperatorId: this.operator.iOperatorId, lOperatorsAvailability: this.availability, iUserId: this.mainService.currentUser.iUserId })
      .then(
        res => {
          let o = res;
          alert(o);
        }
        , err => {
          alert("err");
        }
      );
  }
  saved=false;
  save() {

    //update active category at all activities
    this.operator.nvActivityies = this.activityCategories.find(x => x.Key == this.iCategory).Value;

    if (this.operator.lActivity.length > 0) {
      this.operator.lActivity.forEach(element => {
        element.iCategoryType = this.iCategory;
      });
    }

    //save operator details changes
    let func = this.newOp == true ? 'AddOperator' : 'UpdateOperator';
    this.mainService.post(func, { oOperator: this.operator })
      .then(
        res => {
          let o = res;
          if(o)
          {
            this.saved=true;
          }
          debugger
          //קבלה מהשרת את רשימת מפעילים המעודכנת
          this.mainService.getAllOperators();

        }
        , err => {
          alert("err");
        }
      );

  }

  //add school/setting to the list
  onItemSelect(item: Setting, type: string) {

    switch (type) {
      case 'talanSchool':
        this.operator.lSchools.push(item.iSettingId);
        break;
      case 'settings':
        this.operator.lSchoolsExcude.push(item.iSettingId);

        break;

      default:
        break;
    }

  }


  //Delete school/setting from the list
  OnItemDeSelect(item: Setting, type: string) {

    switch (type) {
      case 'talanSchool':
        this.operator.lSchools.splice(this.operator.lSchools.findIndex(x => x == item.iSettingId), 1);
        this.operator.lSchools.length == 0 ? this.operator.bTalan = false : true;

        break;
      case 'settings':
        this.operator.lSchoolsExcude.splice(this.operator.lSchoolsExcude.findIndex(x => x == item.iSettingId), 1);
        this.operator.lSchoolsExcude.length == 0 ? this.bSettingslsExclude = false : true;

        break;

      default:
        break;
    }
  }


  onSelectAll(type: string) {

    switch (type) {
      case 'talanSchool':
        this.operator.lSchools = this.schoolListforTalan.map((item) => item.iSettingId);

        break;
      case 'settings':
        this.operator.lSchoolsExcude = this.settingsList.map((item) => item.iSettingId);
        this.operator.settings = [];

        break;
      case 'neighberhoods':
        this.operator.lNeighborhoods = Array.from(this.mainService.SysTableList[4].keys());
      default:
        break;
    }
  }

  onDeSelectAll(type: string) {

    switch (type) {
      case 'talanSchool':
        this.operator.lSchools = [];
        this.operator.bTalan = false;

        break;
      case 'settings':
        this.operator.lSchoolsExcude = [];
        this.bSettingslsExclude = false;
        break;
      case 'neighberhoods':
        this.operator.lNeighborhoods = [];
        this.blNeighborhoods = false;
      default:
        break;
    }
  }

  //When deselect neighborhood
  onDeSelectNeighborhood(item: forSelect) {

    this.operator.lNeighborhoods.splice(this.NeighborhoodsList.findIndex(x => x.Key == item.Key), 1);
    if (this.operator.lNeighborhoods.length == 0) {
      this.blNeighborhoods = false;
    }
  }
  //When select neighborhood
  onSelectNeighborhood(item: forSelect) {//הוספה

    this.operator.lNeighborhoods.push(item.Key);
    console.log(item);
  }

}
