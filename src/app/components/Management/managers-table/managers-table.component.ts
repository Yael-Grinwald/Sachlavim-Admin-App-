import { User } from 'src/app/classes/user';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operator } from 'src/app/Classes/operator';
import { MySearchPipe } from 'src/app/pipe/my-search.pipe';
import { from } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-managers-table',
  templateUrl: './managers-table.component.html',
  styleUrls: ['./managers-table.component.css']
})
export class ManagersTableComponent implements OnInit {


  arr:string[]=["nvLastName","nvFirstName"]
  row:string[]=["row.nvLastName","row.nvFirstName"]
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['details','nvLastName', 'nvFirstName', 'iUserType', 'nvUserName', 'nvMobile', 'nvMail'];

  //סוג מקור הנתונים
  dataSource: MatTableDataSource<User>;
  //מערך מפעילים לטבלה
  usersList: Array<User>;
  editUser: User = new User();
  lUserTypeValue: Map<number, string> = new Map<number, string>();

  constructor(private mainService: MainServiceService) {
    this.GetUsers();
    //מילוי הרשימה בצורה של MAP
    this.lUserTypeValue = mainService.SysTableList[0];
  }

  ngOnInit() {
    this.ngAfterViewInit();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  GetUsers() {
    this.mainService.post("GetUsers", {})
      .then(
        res => {
          if (res) {
            this.usersList = res;
            // this.usersList.forEach(element => {
            //   switch(element.iUserType)
            //   {
            //     case 1:
            //   }
            // });

            this.dataSource = new MatTableDataSource(this.usersList);

          }
          else
            alert("GetUsers management error");
        },
        err => {
          alert("error");
        }
      );
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
          this.GetUsers();
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
