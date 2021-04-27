import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operator } from 'src/app/Classes/operator';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';
import { from } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Item } from 'angular2-multiselect-dropdown';


@Component({
  selector: 'app-operator-table',
  templateUrl: './operator-table.component.html',
  styleUrls: ['./operator-table.component.css']
})
export class OperatorTableComponent implements OnInit {

  ContactNameFilter = new FormControl('');
  nameFilter = new FormControl('');
  OperatorTypeFilter = new FormControl('');
  CompanyNameFilter = new FormControl('');
  categoryFilter = new FormControl('');
  IdentityFilter = new FormControl('');
  ContactPersonPhoneFilter = new FormControl('');
  ContactPersonMailFilter = new FormControl('');
  //מערך מפעילים לטבלה
  operators: Operator[];
  //מערך שמות העמודות
  displayedColumns: string[] = ['select', 'update', 'iOperatorType', 'nvOperatorName', 'nvContactPerson', 'nvCompanyName', 'nvActivityies', 'nvIdentity', 'nvContactPersonPhone', 'nvContactPersonMail', 'bInProgramPool', 'delete'];
  //סוג מקור הנתונים
  dataSource: MatTableDataSource<Operator>;

  emailAddress: Array<string> = new Array<string>();
  emailContent: string;
  emailSubject: string;

  operatorTypes: Map<number, string> = new Map<number, string>();
  //array of the filter colomns
  filterValues = {
    nvOperatorName: '',
    nvContactPerson: '',
    iOperatorType: '',
    nvCompanyName: '',
    nvActivityies: '',
    nvIdentity: '',
    nvContactPersonPhone: '',
    nvContactPersonMail: ''
    // bInProgramPool:''
  };
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private mainService: MainServiceService) {
    this.operatorTypes = this.mainService.SysTableList[2];

    this.operators = this.mainService.operatorsList;

    this.dataSource = new MatTableDataSource(this.operators);
    this.dataSource.filterPredicate = this.createFilter();


  }


  ngOnInit() {

    this.ngAfterViewInit();

    //subscribe to changes in the colomns filter value
    this.nameFilter.valueChanges.subscribe(
      name => {
        //filter the results according the recent colomn filter value
        this.filterValues.nvOperatorName = name;
        //update the datasorce
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.ContactNameFilter.valueChanges.subscribe(
      cname => {
        this.filterValues.nvContactPerson = cname;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.OperatorTypeFilter.valueChanges.subscribe(
      name => {
        this.filterValues.iOperatorType = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.CompanyNameFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvCompanyName = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.categoryFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvActivityies = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.IdentityFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvIdentity = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.ContactPersonPhoneFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvContactPersonPhone = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.ContactPersonMailFilter.valueChanges.subscribe(
      name => {
        this.filterValues.nvContactPersonMail = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }

  //A function responsible for filtering each column according to the given value. 
  createFilter(): (data: any, filter: string) => boolean {

    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.nvOperatorName.toLowerCase().indexOf(searchTerms.nvOperatorName) !== -1
        && data.nvContactPerson.toLowerCase().indexOf(searchTerms.nvContactPerson) !== -1
        && data.nvCompanyName.toLowerCase().indexOf(searchTerms.nvCompanyName) !== -1
        && data.nvActivityies.toLowerCase().indexOf(searchTerms.nvActivityies) !== -1
        && data.nvIdentity.toLowerCase().indexOf(searchTerms.nvIdentity) !== -1
        && data.nvContactPersonPhone.toLowerCase().indexOf(searchTerms.nvContactPersonPhone) !== -1
        && data.nvContactPersonMail.toLowerCase().indexOf(searchTerms.nvContactPersonMail) !== -1;
    }
    return filterFunction;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  //מחיקת מפעיל
  DeleteOperator(oper: Operator) {

    if (confirm("האם אתה בטוח שברצונך למחוק את  " + oper.nvOperatorName + "?")) {
      this.mainService.post("DeleteOperator", { iOperatorId: oper.iOperatorId, iUserId: this.mainService.currentUser.iUserId }).then(
     async   res => {
          this.mainService.operatorsList = res;
          await  this.mainService.getAllOperators(); 
          await location.reload();
          this.mainService.serviceNavigate('./header-menu/operators/operator-table');
          alert("המחיקה הושלמה")

          debugger
        },
        err => {
          alert(err +'DeleteOperator');
        }
      );
    }

  }

  addOperator() {
    this.mainService.operatorForDetails = new Operator();
    this.mainService.serviceNavigateForId('/header-menu/operators/operator-menu/', -1);
  }

  //עריכת מפעיל
  async EditOperator(op: Operator) {

    //update the service the current operator
    this.mainService.operatorForDetails= <Operator> await this.mainService.post("GetOperator",{iOperatorId: op.iOperatorId });

debugger
  //rout to details page
this.mainService.serviceNavigateForId("/header-menu/operators/operator-menu/", op.iOperatorId);
  }

emailList()
{

  this.emailAddress = this.selection.selected.map(obj => obj.nvContactPersonMail);
}

sendEmail()
{
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

/** Multi Select
 *  Whether the number of selected elements matches the total number of rows. */
selection = new SelectionModel<Operator>(true, []);

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

 
}





