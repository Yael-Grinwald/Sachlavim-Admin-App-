import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operator } from 'src/app/classes/operator';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';
import { MatCheckboxModule } from '@angular/material'
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Setting } from 'src/app/Classes/setting';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { operatorsAvailability } from 'src/app/Classes/operatorsAvailability';
import { Activity } from 'src/app/classes/activity';

@Component({
  selector: 'app-operator-details',
  templateUrl: './operator-details.component.html',
  styleUrls: ['./operator-details.component.css']
})
export class OperatorDetailsComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  dropdownNeighborhoods: IDropdownSettings;
  operatorsAvailability: operatorsAvailability[] = [];


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
  iCategory: number=0;
  mat: ElementRef;
  isValid: boolean = false;
  Activities: Activity[]=[];
  constructor(private route: ActivatedRoute, private mainService: MainServiceService,private elementRef: ElementRef) {
  }

  ngOnInit() {


    this.operator = this.mainService.operatorForDetails;//פרטי המפעיל לטופס עריכה
    this.settingsList = this.mainService.settingsList;
    this.activityCategories = this.mainService.gItems[7].dParams;

    //find id category of operator activities
    this.activityCategories.forEach(element => {
      this.iCategory = this.operator.nvActivityies.includes(element.Value) ? element.Key : this.iCategory;
      
    });
    
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
        },
        err => {
          alert(err);
        }
      );

      this.blNeighborhoods = this.operator.lNeighborhoods.length > 0 ? true : false;//ממלא את הרשימה אם פעיל באיזורים מסויימים
      this.bSettingslsExclude = this.operator.lSchoolsExcude.length > 0 ? true : false;//מלוי רשימה אם לא פועל במיסגרות מסויימות

      if (this.operator.lSchools.length > 0)//talan schools where operates, for the form input
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

modal:boolean=true;
  showCategoryModal(event:any){
if(this.operator.iOperatorId!=-1)
{
  this.modal=true;
}
  }
  h: boolean = false;

  checkFormValid() {
    //check if no mat-hint with context 
    const dom: HTMLElement = this.elementRef.nativeElement;
    const list = document.querySelectorAll('.mat-hint');
debugger
    list.forEach(function (Item) {
      if (Item.innerHTML != '') {
        alert('נא שים לב לתוכן תקין');
        this.h = true;
        return false
      }
    });

    debugger

    if (this.h == false) {
      this.save()
    }
  }

  save() {

    this.Activities = this.mainService.operatorForDetails.lActivity;
    this.Activities.forEach(element => {
      element.iCategoryType=this.iCategory;
    });

    this.operator.lNeighborhoods = this.operator.lSchools = this.operator.lSchoolsExcude = [];
    this.operator.bTalan == false ? this.operator.lSchools = [] : this.lschool.map((item) => item.iSettingId);
    this.bSettingslsExclude == false ? this.operator.lSchoolsExcude = [] : this.schoolsExcludeList.map((item) => item.iSettingId);
    this.blNeighborhoods == false ? this.operator.lNeighborhoods = [] : this.operatorNeighborhoods.map((item) => item.Key);
    debugger
    let func=this.newOp==true?'AddOperator':'UpdateOperator';
    this.mainService.post(func, { oOperator: this.operator })
      .then(
        res => {
          let o = res;
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
    debugger
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
