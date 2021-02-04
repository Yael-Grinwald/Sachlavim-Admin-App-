import { User } from 'src/app/classes/user';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';
import { ChangeDetectionStrategy, AfterViewInit, ViewChild, Component, OnInit, SystemJsNgModuleLoader, ElementRef } from '@angular/core';
import { Setting } from 'src/app/Classes/setting';
import { coordinator } from 'src/app/Classes/coordinator';
import { flatten } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as XLSX from 'XLSX';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operator } from 'src/app/Classes/operator';
import { MySearchPipe } from 'src/app/Pipes/my-search.pipe';
import { from } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Item } from 'angular2-multiselect-dropdown';


@Component({
  selector: 'app-setting-table',
  templateUrl: './setting-table.component.html',
  styleUrls: ['./setting-table.component.css']
})
export class SettingTableComponent implements OnInit {


  // displayedColumns: string[] = ['iSettingId', 'nvSettingName', 'nvSettingCode', 'nvSettingTypeValue', 'nvAddress', 'nvPhone',
  //   'nvContactPerson', 'nvContactPersonMail', 'nvContactPersonPhone', 'lSettingAgegroupsValue', 'nvFullName',
  //   'nvMail', 'nvPhoneCoordinator','edit','choose'];
  displayedColumns: string[] = ['select', 'edit', 'iSettingId', 'nvSettingName', 'iSettingType', 'nvAddress', 'nvPhone',
    'nvContactPerson','nvContactPersonPhone', 'nvContactPersonMail',  'lSettingAgegroups', 'CoordinatorDetails'
  ];


  //סוג מקור הנתונים
  dataSource: MatTableDataSource<Setting>;
  //מערך מפעילים לטבלה
  settingList: Array<Setting>;
  currentSetting: Setting = new Setting();
  coordinatorList: Array<coordinator>;
  coordinator: coordinator = new coordinator();
  openDetails: boolean = false;
  lSettingAgegroupsValue: Map<number, string> = new Map<number, string>();
  lSettingTypeValue: Map<number, string> = new Map<number, string>();

  emailAddress: Array<string> = new Array<string>();
  emailContent: string;
  emailSubject: string;


  constructor(private mainService: MainServiceService) {
    //this.lSettingAgegroups = this.lSysTable[7-1].dParams;
    //this.lSettingType = this.lSysTable[6-1].dParams;
    this.CoordinatorsGet();
    this.settingList = mainService.settingsList;
    this.dataSource = new MatTableDataSource(this.settingList);
    //קבלת הרשימות מהסרויס
    this.lSettingTypeValue = mainService.SysTableList[5];
    this.lSettingAgegroupsValue = mainService.SysTableList[6];
    this.dataSource.filterPredicate = this.createFilter();
    debugger

  }
  SettingIdFilter = new FormControl('');
  SettingNameFilter = new FormControl('');
  SettingTypeFilter = new FormControl('');
  AddressFilter = new FormControl('');
  PhoneFilter = new FormControl('');
  ContactPersonFilter = new FormControl('');
  ContactPersonMailFilter = new FormControl('');
  ContactPersonPhoneFilter = new FormControl('');

  filterValues = {
    iSettingId: '',
    nvSettingName: '',
    // iSettingType: '',
    nvAddress: '',
    nvPhone: '',
    nvContactPerson: '',
    nvContactPersonMail: '',
    nvContactPersonPhone: '',
    // bInProgramPool:''
  };
 
  ngOnInit() {
    this.ngAfterViewInit();
     this.SettingIdFilter.valueChanges.subscribe(
       name => {
         this.filterValues.iSettingId = name;
         this.dataSource.filter = JSON.stringify(this.filterValues);
       }
    )
    this.SettingNameFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvSettingName = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    // this.SettingTypeFilter.valueChanges.subscribe(
    //   name => {
    //     this.filterValues.iSettingType = name;
    //     this.dataSource.filter = JSON.stringify(this.filterValues);
    //   }
    // )
    this.AddressFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvAddress = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.PhoneFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvPhone = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.ContactPersonFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvContactPerson = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.ContactPersonMailFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvContactPersonMail = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.ContactPersonPhoneFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvContactPersonPhone = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter); debugger
      return (data.iSettingId+"").toLowerCase().indexOf(searchTerms.iSettingId) !== -1
      && data.nvSettingName.toLowerCase().indexOf(searchTerms.nvSettingName) !== -1
        //  && this.operatorTypes.get(data.iOperatorType).toLowerCase().indexOf(searchTerms.iOperatorType) !== -1
        // && data.iSettingType.toLowerCase().indexOf(searchTerms.iSettingType) !== -1
        && data.nvAddress.toLowerCase().indexOf(searchTerms.nvAddress) !== -1
        && data.nvPhone.toLowerCase().indexOf(searchTerms.nvPhone) !== -1
        && data.nvContactPerson.toLowerCase().indexOf(searchTerms.nvContactPerson) !== -1
        && data.nvContactPersonMail.toLowerCase().indexOf(searchTerms.nvContactPersonMail) !== -1
        && data.nvContactPersonPhone.toLowerCase().indexOf(searchTerms.nvContactPersonPhone) !== -1;
    }
    return filterFunction;
  }
  CoordinatorsGet() {
    this.mainService.post("CoordinatorsGet", {}).then(
      res => {
        this.coordinatorList = res;
      },
      err => {
        alert("CoordinatorsGet err")
      }
    );
  }

  CoordinatorDetails(sett: Setting, CoordinatorId: number) {
    this.currentSetting = sett;
    if (this.openDetails == true)
      this.openDetails = false;
    else
      this.openDetails = true;

    if (CoordinatorId) {
      this.coordinator = this.coordinatorList.find(c => c.iCoordinatorId == CoordinatorId);
    }
  }
  EditSetting(setting: Setting) {
    this.mainService.settingForDetails = setting;
    this.mainService.serviceNavigateForId('/header-menu/settings/settings-details-menu/', setting.iSettingId);
  }
  addSetting() {
    this.mainService.settingForDetails = new Setting();
    this.mainService.serviceNavigateForId('/header-menu/settings/settings-details-menu/', -1);

  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'setting.xlsx');

  }
  emailList() {
    this.emailAddress = this.selection.selected.map(obj => obj.nvContactPersonMail);
  }

  sendEmail() {
    this.mainService.post("SendMailsMessage", { nvSubject: this.emailSubject, nvBody: this.emailContent, emailAddressesList: this.emailAddress, filePath: "" }).then(
      res => {

        let r = res;
        alert(res);
      },
      err => {
        alert(err);
      }
    );
  }

  /** Multi Select
  *  Whether the number of selected elements matches the total number of rows. */
  selection = new SelectionModel<Setting>(true, []);

  isAllSelected() {
    debugger
    this.selection.selected
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    debugger
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
