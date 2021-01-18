import { MainServiceService } from 'src/app/services/MainService/main-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Program } from 'src/app/Classes/program';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { parse } from 'url';

@Component({
  selector: 'app-programs-table',
  templateUrl: './programs-table.component.html',
  styleUrls: ['./programs-table.component.css']
})
export class ProgramsTableComponent implements OnInit {

  displayedColumns: string[] = [ 'edit', 'iProgramType', 'nvProgramName', 'dFromDateFormat', 'dToDateFormat',
    'lProgramSettings', 'lProgramAgegroups', 'nvBudgetItem'];

  programList: Array<Program>;
  dataSource: MatTableDataSource<Program>;
  lProgramAgegroupsValue: Map<number, string> = new Map<number, string>();
  lProgramTypeValue: Map<number, string> = new Map<number, string>();

  ngOnInit() {
    this.ngAfterViewInit();
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private mainService: MainServiceService) {
    this.programList = this.mainService.programsList;
    this.spliceProgramsList();
    //קבלת הרשימות מהסרויס
    this.lProgramAgegroupsValue = mainService.SysTableList[6];
    this.lProgramTypeValue = mainService.SysTableList[9];
    // alert(this.lProgramAgegroupsValue[0].value)

  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  spliceProgramsList() {
    var i = 0;
    this.programList.forEach(p => {
      if (p.iProgramType == -1)
        this.programList.splice(i, 1);
      i++;
    });
    this.dataSource = new MatTableDataSource(this.programList);
  }


  EditProgram(prog: Program) {
    this.mainService.programForDetails = prog;
    this.mainService.serviceNavigateForId("/header-menu/programs/programs-details-menu/", prog.iProgramId)
  }
  addProgram() {
    this.mainService.programForDetails = new Program();
    this.mainService.serviceNavigateForId("/header-menu/programs/programs-details-menu/", -1)
  }

  
}
