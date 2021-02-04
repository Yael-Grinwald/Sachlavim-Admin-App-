import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { coordinator } from 'src/app/Classes/coordinator';
import { Setting } from 'src/app/Classes/setting';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';


@Component({
  selector: 'app-settings-details',
  templateUrl: './settings-details.component.html',
  styleUrls: ['./settings-details.component.css']
})
export class SettingsDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Cradio', 'edit', 'nvFirstName', 'nvLastName', 'nvPhone', 'bIsActive'];

  lSettingAgegroupsValue: forSelect[] = [];
  SettingAgegroupsListNg: forSelect[] = [];
  dropdownSettingAgegroups: IDropdownSettings;

  panelOpenState = false;
  idSetting: number;
  settingList: Array<Setting>;
  currentSetting: Setting = new Setting();
  currentCoordinator: coordinator = new coordinator();
  coordinatorList: Array<coordinator>;
  formSetting: FormGroup;
  lSettingTypeValue: Map<number, string> = new Map<number, string>();
  lNeighborhoodTypeValue: Map<number, string> = new Map<number, string>();
  //מקור הנתונים לטבלה של הרכזות
  dataSource: MatTableDataSource<coordinator>;

  newSe:boolean=true;

  constructor(private mainService: MainServiceService) {
    this.lNeighborhoodTypeValue = mainService.SysTableList[4];
    this.lSettingTypeValue = mainService.SysTableList[5];
  }

  ngOnInit() {

    // this.idSetting = parseInt(this.route.snapshot.paramMap.get('id'));
    this.currentSetting = this.mainService.settingForDetails;
    this.CoordinatorsGet();
    this.lSettingAgegroupsValue = this.mainService.gItems[6].dParams;

//אתחול הרשימות רק אם אניו מסגרת חדשה
    if(this.currentSetting.iSettingId!=-1)
  {
    this.newSe=false;
    // איתחול רשימת הגילאים של התוכנית 
    if (this.currentSetting.lSettingAgegroups.length > 0) {
      for (let nlId of this.currentSetting.lSettingAgegroups) {
        this.SettingAgegroupsListNg.push(this.lSettingAgegroupsValue.find(x => x.Key == nlId));
      }
    }

  }
    
    debugger
    //הגדרות ה multi select
    this.dropdownSettingAgegroups = {
      singleSelection: false,
      idField: 'Key',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.ngAfterViewInit();

  }
  CoordinatorsGet() {
    this.mainService.post("CoordinatorsGet", {}).then(
      res => {
        this.coordinatorList = res;
        if (this.currentSetting.iCoordinatorId && this.currentSetting.iCoordinatorId != this.currentCoordinator.iCoordinatorId)
          this.currentCoordinator = this.coordinatorList.find(c => c.iCoordinatorId == this.currentSetting.iCoordinatorId);
        this.dataSource = new MatTableDataSource(this.coordinatorList);

      },
      err => {
        alert("CoordinatorsGet err")
      }
    );
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  saveSetting() {

    this.currentSetting.lSettingAgegroups.splice(0, this.currentSetting.lSettingAgegroups.length)//delete th list
    //  עידכון רשימת הגילאים שלא תוכנית לפי הרשימה שנבחרה 
    if (this.SettingAgegroupsListNg.length > 0) {
      for (let age of this.SettingAgegroupsListNg)//מעבר על הרשימה שנבחרה
      {
        this.currentSetting.lSettingAgegroups.push(age.Key);
      }
    }
    debugger
    //alert(this.currentSetting.lSettingAgegroups[0])
    this.mainService.post("SettingInsertUpdate", { oSetting: this.currentSetting, iUserId: this.mainService.currentUser.iUserId }).then(
      res => {
        //קבלה מהשרת את רשימת מפעילים המעודכנת
        this.mainService.getSettings();
        alert("update " + this.currentSetting.nvSettingName + " done!");

        this.mainService.serviceNavigate("/header-menu/settings/setting-table");
      },
      err => {
        alert("saveSetting err");
      }
    )
  }
  // selected: boolean = false;
  // isSelected(s: any) {
  //   // alert(this.currentSetting.lSettingAgegroups.includes(s))
  //   this.selected = this.currentSetting.lSettingAgegroups.includes(s);
  //   return true;
  // }

  checkCoordinator(iCoordinatorId: number) {
    this.currentSetting.iCoordinatorId = iCoordinatorId;
  }
  addCoordinator: coordinator = new coordinator();
  saveCoordinator() {
    this.coordinatorList.push(this.addCoordinator);
    this.mainService.post("CoordinatorInsertUpdt", { oCoordinator: this.addCoordinator, iUserId: this.mainService.currentUser.iUserId }).then(
      res => {
        this.currentCoordinator = res;
        this.currentSetting.iCoordinatorId = this.currentCoordinator.iCoordinatorId;
        this.CoordinatorsGet();
      }
      ,
      err => {
        alert("err saveCoordinator")
      }
    )
  }
  updateCoordinatorToEdit(c: any) {
    if (c != -1)
      this.addCoordinator = (c as coordinator);
    else
      this.addCoordinator = new coordinator();
  }

  validation(){
    
  }
}