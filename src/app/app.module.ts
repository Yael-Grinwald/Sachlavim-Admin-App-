import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ScheduleModule,DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService } from '@syncfusion/ej2-angular-schedule';


// for calender
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {
  
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  

  MatDatepickerModule,
  MatDatepicker,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatSlideToggleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,MatProgressSpinnerModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RoutModule } from './routing/rout.module';
import { MatExpansionModule} from '@angular/material/expansion';
import { AfternoonDetailsComponent } from './components/Afternoons/afternoon-details/afternoon-details.component';
import { AfternoonDetailsMenuComponent } from './components/Afternoons/afternoon-details-menu/afternoon-details-menu.component';
import { AfternoonScheduleComponent } from './components/Afternoons/afternoon-schedule/afternoon-schedule.component';
import { WeeklySchedulingComponent } from './components/Afternoons/weekly-scheduling/weekly-scheduling.component';
import { LoginComponent } from './components/Login/login/login.component';
import { HeaderMenuComponent } from './components/Main/header-menu/header-menu.component';
import { MessageComponent } from './components/Main/message/message.component';
import { ManagersTableComponent } from './components/Management/managers-table/managers-table.component';
import { ManagementScheduleComponent } from './components/Management/management-schedule/management-schedule.component';
import { ManagementSettingsClustersComponent } from './components/Management/management-settings-clusters/management-settings-clusters.component';
import { ManagementSettingsJointComponent } from './components/Management/management-settings-joint/management-settings-joint.component';
import { ManagementMenuComponent }from'./components/Management/management-menu/management-menu.component';
import { OperatorActivityReportComponent } from './components/Operators/operator-activity-report/operator-activity-report.component';
import { OperatorCreditComponent } from './components/Operators/operator-credit/operator-credit.component';
import { OperatorDetailsComponent } from './components/Operators/operator-details/operator-details.component';
import { OperatorMessagesComponent } from './components/Operators/operator-messages/operator-messages.component';
import { OperatorReviewComponent } from './components/Operators/operator-review/operator-review.component';
import { OperatorScheduleComponent } from './components/Operators/operator-schedule/operator-schedule.component';
import { OperatorMenuComponent } from './components/Operators/operator-menu/operator-menu.component';
import { ProgramDetailsComponent } from './components/Programs/program-details/program-details.component';
import { ProgramDetailsMenuComponent } from './components/Programs/program-details-menu/program-details-menu.component';
import { ProgramReportComponent } from './components/Programs/program-report/program-report.component';
import { ProgramsComponent } from './components/Programs/programs/programs.component';
import { ProgramScheduleComponent } from './components/Programs/program-schedule/program-schedule.component';
import { SettingsComponent } from './components/Settings/settings/settings.component';
import { SettingsDetailsComponent } from './components/Settings/settings-details/settings-details.component';
import { SettingsDetailsMenuComponent } from './components/Settings/settings-details-menu/settings-details-menu.component';
//import {FlexLayoutModule} from '@angular/flex-layout';
import { from } from 'rxjs';
import { OperatorTableComponent } from './components/Operators/operator-table/operator-table.component';
import { OperatorsComponent } from './components/Operators/operators/operators.component';
import { OperatorActivitiesComponent } from './components/Operators/operator-activities/operator-activities.component';
import { SettingTableComponent } from './components/Settings/setting-table/setting-table.component';
import { SettingsScheduleComponent } from './components/Settings/settings-schedule/settings-schedule.component';
import { SettingsMessagesComponent } from './components/Settings/settings-messages/settings-messages.component';
import { ProgramsTableComponent } from './components/Programs/programs-table/programs-table.component';
import { AfternoonComponent } from './components/Afternoons/afternoon/afternoon.component';
import { AfternoonTableComponent } from './components/Afternoons/afternoon-table/afternoon-table.component';
import { TableComponent } from './table/table.component';
import * as XLSX from 'xlsx';
import { CalendarHeaderComponent } from './components/calendar/calendar-header-component';

import localeHe from '@angular/common/locales/he';
registerLocaleData(localeHe);
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { HebrewDatePipe } from './pipe/hebrew-date.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    TableComponent,
    AppComponent,
    AppComponent,
    AppComponent,
    AfternoonDetailsComponent,
    AfternoonDetailsMenuComponent,
    AfternoonScheduleComponent,
    WeeklySchedulingComponent,
    LoginComponent,
    HeaderMenuComponent,
    MessageComponent,
    ManagersTableComponent,
    ManagementScheduleComponent,
    ManagementSettingsClustersComponent,
    ManagementSettingsJointComponent,
    ManagementMenuComponent,
    OperatorActivityReportComponent,
    OperatorCreditComponent,
    OperatorDetailsComponent,
    OperatorMessagesComponent,
    OperatorReviewComponent,
    OperatorScheduleComponent,
    OperatorMenuComponent,
    ProgramDetailsComponent,
    ProgramDetailsMenuComponent,
    ProgramReportComponent,
    ProgramsComponent,
    ProgramScheduleComponent,
    SettingsComponent,
    SettingsDetailsComponent,
    SettingsDetailsMenuComponent,
    OperatorTableComponent,
    OperatorsComponent,
    OperatorActivitiesComponent,
    SettingTableComponent,
    SettingsScheduleComponent,
    SettingsMessagesComponent,
    ProgramsTableComponent,
    AfternoonComponent,
    AfternoonTableComponent,
    TableComponent,
    CalendarHeaderComponent,
    HebrewDatePipe,
    CalendarComponent,
  ],
  imports: [

    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),    

    CommonModule,
    ScheduleModule,
    BrowserModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
     DropDownListModule,
     CalendarModule ,

    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatListModule,
    HttpClientModule,
    RouterModule,
    RoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,


 
   //FlexLayoutModule
   AgGridModule

  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }