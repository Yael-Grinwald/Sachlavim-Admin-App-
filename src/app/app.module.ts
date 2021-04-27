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
  MatSlideToggleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,MatProgressSpinnerModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS
} from '@angular/material';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RoutModule } from './Routing/rout.module';
import { MatExpansionModule} from '@angular/material/expansion';
import { AfternoonDetailsComponent } from './components/Afternoons/afternoon-details/afternoon-details.component';
import { AfternoonDetailsMenuComponent } from './components/Afternoons/afternoon-details-menu/afternoon-details-menu.component';
import { AfternoonScheduleComponent } from './components/Afternoons/afternoon-schedule/afternoon-schedule.component';
import { LoginComponent } from './components/Login/login/login.component';
import { HeaderMenuComponent } from './components/Main/header-menu/header-menu.component';
import { MessageComponent } from './components/Main/message/message.component';
import { ManagersTableComponent } from './components/Management/managers-table/managers-table.component';
import { ManagementScheduleComponent } from './components/Management/management-schedule/management-schedule.component';
import { ManagementMenuComponent }from'./components/Management/management-menu/management-menu.component';
import { OperatorActivityReportComponent } from './components/Operators/operator-activity-report/operator-activity-report.component';
import { OperatorDetailsComponent } from './components/Operators/operator-details/operator-details.component';
import { OperatorMessagesComponent } from './components/Operators/operator-messages/operator-messages.component';
import { OperatorScheduleComponent } from './components/Operators/operator-schedule/operator-schedule.component';
import { OperatorMenuComponent } from './components/Operators/operator-menu/operator-menu.component';
import { ProgramDetailsComponent } from './components/Programs/program-details/program-details.component';
import { ProgramDetailsMenuComponent } from './components/Programs/program-details-menu/program-details-menu.component';
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
import { HebrewDatePipe } from './Pipes/hebrew-date.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StringPipe } from './Pipes/Validation/string.pipe';
import { PhonePipe } from './Pipes/Validation/phone.pipe';
import { IdNumberPipe } from './Pipes/Validation/id-number.pipe';
import { RequiredPipe } from './Pipes/Validation/required.pipe';
import { EmailPipe } from './Pipes/Validation/email.pipe';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ParashaPipe } from './Pipes/parasha.pipe';
import { HolidaysPipe } from './Pipes/holidays.pipe';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { CheckValidDatePipe } from './Pipes/Validation/check-valid-date.pipe';
import { DatePipe } from '@angular/common'


import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    AppComponent,
    AfternoonDetailsComponent,
    AfternoonDetailsMenuComponent,
    AfternoonScheduleComponent,
    LoginComponent,
    HeaderMenuComponent,
    MessageComponent,
    ManagersTableComponent,
    ManagementScheduleComponent,
    ManagementMenuComponent,
    OperatorActivityReportComponent,
    OperatorDetailsComponent,
    OperatorMessagesComponent,
    OperatorScheduleComponent,
    OperatorMenuComponent,
    ProgramDetailsComponent,
    ProgramDetailsMenuComponent,
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
    CalendarHeaderComponent,
    HebrewDatePipe,
    CalendarComponent,
    StringPipe,
    PhonePipe,
    IdNumberPipe,
    RequiredPipe,
    EmailPipe,
    ParashaPipe,
    HolidaysPipe,
    MessageDialogComponent,
    CheckValidDatePipe,
  ],
  imports: [
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
             NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),    

    CommonModule,
    ScheduleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
     DropDownListModule,
     CalendarModule ,

    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    BrowserModule,
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
    MatTableExporterModule,

 
   //FlexLayoutModule
   AgGridModule

  ],
  providers: [

DatePipe,
      {provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
  
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService],
  bootstrap: [AppComponent]

})
export class AppModule { }