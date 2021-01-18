import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSelect, MatSort, MatTableDataSource } from '@angular/material';
import { Activity } from 'src/app/classes/activity';
import { MatTableModule } from '@angular/material/table';
import { forSelect, MainServiceService } from 'src/app/services/MainService/main-service.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-operator-activities',
  templateUrl: './operator-activities.component.html',
  styleUrls: ['./operator-activities.component.css']
})
export class OperatorActivitiesComponent implements OnInit {

  dropdownSettings:IDropdownSettings;

  //מערך שמות העמודות
  displayedColumns: string[] = ['nvActivityName','iCategoryType','nvActivityProduct', 'lActivityAgegroups', 'nPrice', 'nShortBreak','nLongBreak','bActivityMorning','bActivityNoon','update'];
  //סוג מקור הנתונים
  dataSource: MatTableDataSource<Activity>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  //רשימת פעילויות
  Activities:Activity[]=[];
  CurrentActivity:Activity=new Activity();
  agesCategories:forSelect[]=[];
  
  activControl:forSelect=new forSelect(0," ");
  activFilterCtrl:FormControl=new FormControl();
  /** list of activities filtered by search keyword */
  public filteredActivities: ReplaySubject<forSelect[]> = new ReplaySubject<forSelect[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  
  activityCategories:Map<number,string>=new  Map<number,string>();
  agesForTable:Map<number,string>=new  Map<number,string>();
  AgesSelected: forSelect[]=[];
  ActivitiesType: forSelect[]=[];
  activeType:forSelect;
  
  constructor(private mainService: MainServiceService) { }


  ngOnInit() {

    this.Activities = this.mainService.operatorForDetails.lActivity;
    this.dataSource = new MatTableDataSource(this.Activities);  
    this.agesForTable=this.mainService.SysTableList[6];

    this.ngAfterViewInit();
    this.ActivitiesType=this.mainService.gItems[7].dParams;
    this.agesCategories=this.mainService.gItems[6].dParams;
    this.activityCategories=this.mainService.SysTableList[7];



          //הגדרות ה multi select
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Key',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
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

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredActivities
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compare With property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: forSelect, b: forSelect) => a && b && a.Key === b.Key;
      });
  }
  
 

  EditActivity(Activity:Activity)
  {
    this.CurrentActivity=Activity;
    this.activControl=this.ActivitiesType.find(x=>x.Key== this.CurrentActivity.iCategoryType);
    if(this.CurrentActivity.lActivityAgegroups!=null)
                {
                    for(let a of this.CurrentActivity.lActivityAgegroups)
                     this.AgesSelected.push(this.agesCategories.find(x=>x.Key==a));
                }
  }

  saveActiveChanges(){

console.log(this.CurrentActivity);
debugger

  }

  onItemSelect(a:forSelect)
  {
    this.CurrentActivity.lActivityAgegroups.push(a.Key)
  }
  onSelectAll(a:forSelect[]){
    this.CurrentActivity.lActivityAgegroups=Array.from( this.mainService.SysTableList[6].keys());
  }

  OnItemDeSelect(a:forSelect){
    this.CurrentActivity.lActivityAgegroups.splice( this.CurrentActivity.lActivityAgegroups.findIndex(x=>x==a.Key),1);
  }
  onDeSelectAll(){
this.CurrentActivity.lActivityAgegroups=[];
  }
}
