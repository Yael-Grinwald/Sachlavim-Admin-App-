import { User } from 'src/app/classes/user';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';
import { ChangeDetectionStrategy,AfterViewInit, ViewChild, Component, OnInit, SystemJsNgModuleLoader, ElementRef } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operator } from 'src/app/Classes/operator';
import { MySearchPipe } from 'src/app/pipe/my-search.pipe';
import { from } from 'rxjs';
import { Setting } from 'src/app/Classes/setting';
import { coordinator } from 'src/app/Classes/coordinator';
import { flatten } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as XLSX from 'XLSX';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
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
    'nvContactPerson', 'nvContactPersonMail', 'nvContactPersonPhone', 'lSettingAgegroups', 'CoordinatorDetails'
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


  }

  ngOnInit() {


    this.ngAfterViewInit();
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
