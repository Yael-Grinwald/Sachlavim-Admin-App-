import { User } from 'src/app/classes/user';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operator } from 'src/app/Classes/operator';
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
import { ToastrService } from 'ngx-toastr';

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
  lUserTypeValue: forSelect[];
  constructor(private mainService: MainServiceService,public toastr: ToastrService) {
    this.usersList = mainService.usersList;
    this.dataSource = new MatTableDataSource(this.usersList);
    //מילוי הרשימה בצורה של MAP
  //  this.lUserTypeValue = mainService.SysTableList[0];
    this.lUserTypeValue = this.mainService.gItems[0].dParams;

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
  iUserType(type:number)
  {
return this.lUserTypeValue.find(x=>x.Key==type).Value;
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
    debugger
    this.mainService.post("AddUpdateUser", { oUser: this.editUser }).then(
      res => {
        if (res) {
          this.mainService.getUsers();
          this.toastr.success('השינויים נשמרו בהצלחה', '', {
            timeOut: 3000,
          });
        }
    
      },
      err => {
        alert("err AddUpdateUser")
      }
    )
  }

  emailAddress: Array<string> = new Array<string>();
  emailContent: string;
  emailSubject: string;

  //for multi select
  selection = new SelectionModel<User>(true, []);

  isAllSelected() {

    this.selection.selected
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  // emailList() {

  //   this.emailAddress = this.selection.selected.map(obj => obj.nvMail);
  // }

  sendEmail() {
    this.mainService.post("SendMailsMessage", { nvSubject: this.emailSubject, nvBody: this.emailContent, emailAddressesList: this.emailAddress, filePath: "" }).then(
      res => {

        let r = res;
        alert("נשלח בהצלחה!");
      },
      err => {
        alert(err);
      }
    );
  }
  h: boolean = false;

  checkFormValid() {
    //check if no mat-hint with context 
    const list = document.querySelectorAll<HTMLInputElement>("mat-hint");

    list.forEach(function (Item) {
      if (Item.innerHTML != '') {
        alert('נא שים לב לתוכן תקין');
        this.h = true;
        return false
      }
    });

    debugger

    if (this.h == false) {
      this.saveUser()
    }
  }
}
