import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSelect, MatSort, MatTableDataSource } from '@angular/material';
import { Activity } from 'src/app/classes/activity';
import { MatTableModule } from '@angular/material/table';
import { forSelect, MainServiceService } from 'src/app/services/MainService/main-service.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';

@Component({
  selector: 'app-operator-activities',
  templateUrl: './operator-activities.component.html',
  styleUrls: ['./operator-activities.component.css']
})
export class OperatorActivitiesComponent implements OnInit {

  dropdownSettings: IDropdownSettings;

  //מערך שמות העמודות
  displayedColumns: string[] = ['nvActivityName', 'iCategoryType', 'nvActivityProduct', 'lActivityAgegroups', 'nPrice', 'nShortBreak', 'nLongBreak', 'bActivityMorning', 'bActivityNoon', 'update'];
  //סוג מקור הנתונים
  dataSource: MatTableDataSource<Activity>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  //רשימת פעילויות
  Activities: Activity[] = [];
  CurrentActivity: Activity = new Activity();
  agesCategories: forSelect[] = [];

  activControl: forSelect = new forSelect(0, " ");
  activFilterCtrl: FormControl = new FormControl();
  /** list of activities filtered by search keyword */
  public filteredActivities: ReplaySubject<forSelect[]> = new ReplaySubject<forSelect[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  activityCategories: Map<number, string> = new Map<number, string>();
  agesForTable: Map<number, string> = new Map<number, string>();
  AgesSelected: forSelect[] = [];
  ActivitiesType: forSelect[] = [];
  activeType: forSelect;
  @ViewChild("content",{static:true}) private contentRef: TemplateRef<Object>;

  constructor(private modalService: NgbModal,private mainService: MainServiceService) { }


  ngOnInit() {

    this.Activities = this.mainService.operatorForDetails.lActivity;
    this.dataSource = new MatTableDataSource(this.Activities);
    this.agesForTable = this.mainService.SysTableList[6];

    this.ngAfterViewInit();
    this.ActivitiesType = this.mainService.gItems[7].dParams;
    this.agesCategories = this.mainService.gItems[6].dParams;
    this.activityCategories = this.mainService.SysTableList[7];

   // this.AgesSelected.push(this.agesCategories.find(x => x.Key == 21));

    //הגדרות ה multi select
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Key',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }
  ngAfterViewInit() {
    this.setInitialValue();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  protected setInitialValue() {
    this.filteredActivities
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
      
        this.singleSelect.compareWith = (a: forSelect, b: forSelect) => a && b && a.Key === b.Key;
      });
  }


show:boolean=false;
  EditActivity(Activity: Activity){ 
    debugger
    this.CurrentActivity = Activity;
    this.activControl = this.ActivitiesType.find(x => x.Key == this.CurrentActivity.iCategoryType);
    if (this.CurrentActivity.lActivityAgegroups != null) {
      for (let a of this.CurrentActivity.lActivityAgegroups)
       if(this.AgesSelected.find(x=>x.Key==a)==null)
       {
         this.AgesSelected.push(this.agesCategories.find(x => x.Key == a));
       } 
    }
    debugger
    //this.modalService.open(this.contentRef, {ariaLabelledBy: 'modal-basic-title'})
this.show=true;
  }
close(){
  this.AgesSelected=[];
  debugger
}
  saveActiveChanges() {
    debugger
    this.CurrentActivity.lActivityAgegroups=[];
    this.AgesSelected.forEach(element=>{
this.CurrentActivity.lActivityAgegroups.push(element.Key);
    });

    this.mainService.post("ActivityInsertUpdate", { oActivity: this.CurrentActivity, iUserId: this.mainService.currentUser.iUserId }).then(
      res => {
        this.CurrentActivity=res;
        
      },
      error => {
        alert(error);
      }
);

}

onItemSelect(a: forSelect) {
  this.CurrentActivity.lActivityAgegroups.push(a.Key)
}
onSelectAll(a: forSelect[]) {
  this.CurrentActivity.lActivityAgegroups = Array.from(this.mainService.SysTableList[6].keys());
}

OnItemDeSelect(a: forSelect) {
  this.CurrentActivity.lActivityAgegroups.splice(this.CurrentActivity.lActivityAgegroups.findIndex(x => x == a.Key), 1);
}
onDeSelectAll() {
  this.CurrentActivity.lActivityAgegroups = [];
}
}
