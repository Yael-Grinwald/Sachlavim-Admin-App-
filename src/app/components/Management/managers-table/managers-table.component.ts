import { User } from 'src/app/classes/user';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operator } from 'src/app/Classes/operator';
import { MySearchPipe } from 'src/app/Pipes/my-search.pipe';
import { from } from 'rxjs';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';
import { MainServiceService, forSelect } from 'src/app/services/MainService/main-service.service';
import { ChangeDetectionStrategy, AfterViewInit, ViewChild, Component, OnInit, SystemJsNgModuleLoader, ElementRef } from '@angular/core';
import { Setting } from 'src/app/Classes/setting';
import { coordinator } from 'src/app/Classes/coordinator';
import { flatten } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as XLSX from 'XLSX';
import { SelectionModel } from '@angular/cdk/collections';
import { Item } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-managers-table',
  templateUrl: './managers-table.component.html',
  styleUrls: ['./managers-table.component.css']
})
export class ManagersTableComponent implements OnInit {


  arr: string[] = ["nvLastName", "nvFirstName"]
  row: string[] = ["row.nvLastName", "row.nvFirstName"]

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['details', 'nvLastName', 'nvFirstName', 'iUserType', 'nvUserName', 'nvMobile', 'nvMail'];

  //סוג מקור הנתונים
  dataSource: MatTableDataSource<User>;
  //מערך מפעילים לטבלה
  usersList: Array<User>;
  editUser: User = new User();
  lUserTypeValue: Map<number, string> = new Map<number, string>();
  constructor(private mainService: MainServiceService) {
    this.usersList=mainService.usersList;
    this.dataSource = new MatTableDataSource(this.usersList);
    //מילוי הרשימה בצורה של MAP
    this.lUserTypeValue = mainService.SysTableList[0];
    this.dataSource.filterPredicate = this.createFilter();
  }
  LastNameFilter = new FormControl('');
  FirstNameFilter = new FormControl('');
  UserNameFilter = new FormControl('');
  MobileFilter = new FormControl('');
  MailFilter = new FormControl('');

  filterValues = {
    nvLastName: '',
    nvFirstName: '',
    nvUserName: '',
    nvMobile: '',
    nvMail: '',
  };
  ngOnInit() {
    this.ngAfterViewInit();
    this.FirstNameFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvFirstName = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.LastNameFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvLastName = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.MailFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvMail = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.MobileFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvMobile = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.UserNameFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvUserName = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter); debugger
      return data.nvLastName.toLowerCase().indexOf(searchTerms.nvLastName) !== -1
        && data.nvFirstName.toLowerCase().indexOf(searchTerms.nvFirstName) !== -1
        && data.nvUserName.toLowerCase().indexOf(searchTerms.nvUserName) !== -1
        && data.nvMobile.toLowerCase().indexOf(searchTerms.nvMobile) !== -1
        && data.nvMail.toLowerCase().indexOf(searchTerms.nvMail) !== -1
    }
    return filterFunction;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  TheEditUser(u: any) {
    if (u != -1)
      this.editUser = (u as User);
    else
      this.editUser = new User();
  }

  saveUser() {

    this.mainService.post("AddUpdateUser", { oUser: this.editUser }).then(
      res => {
        if (res) {
          this.mainService.getUsers();
          alert("update " + this.editUser.nvUserName + " done!");

        }
        else {
          alert("err AddUpdateUser")
        }
      },
      err => {
        alert("err AddUpdateUser")
      }
    )
  }
}
