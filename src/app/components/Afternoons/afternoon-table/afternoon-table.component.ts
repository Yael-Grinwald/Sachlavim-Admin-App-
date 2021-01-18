import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { promise } from 'protractor';
import { Program } from 'src/app/Classes/program';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';

@Component({
  selector: 'app-afternoon-table',
  templateUrl: './afternoon-table.component.html',
  styleUrls: ['./afternoon-table.component.css']
})
export class AfternoonTableComponent implements OnInit {

  displayedColumns: string[] = ['edit', 'iYearType', 'iSemesterType', 'dFromDate', 'dToDate', 'lProgramSettings'];

  afternoonList: Array<Program>;
  dataSource: MatTableDataSource<Program>;
  YearTypeValue: Map<number, string> = new Map<number, string>();
  SemesterTypeValue: Map<number, string> = new Map<number, string>();

  ngOnInit() {
    this.ngAfterViewInit();
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private mainService: MainServiceService) {
    this.afternoonList = this.mainService.afternoonsList;
    this.YearTypeValue = mainService.SysTableList[14];
    this.SemesterTypeValue = mainService.SysTableList[16];
    this.dataSource = new MatTableDataSource(this.afternoonList);
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  EditAfternoon(prog: Program) {
    this.mainService.programForDetails = prog;
    this.mainService.serviceNavigateForId("/header-menu/afternoon/afternoon-details-menu/", prog.iProgramId)
  }

  addAfternoon() {
    this.mainService.programForDetails = new Program();
    this.mainService.serviceNavigateForId("/header-menu/afternoon/afternoon-details-menu/", -1)

  }

}
