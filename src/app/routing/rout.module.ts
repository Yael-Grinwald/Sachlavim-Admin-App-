import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/Login/login/login.component';
import { HeaderMenuComponent } from '../components/Main/header-menu/header-menu.component';
import { ManagementMenuComponent } from '../components/Management/management-menu/management-menu.component';
import { OperatorMenuComponent } from '../components/Operators/operator-menu/operator-menu.component';
import { ProgramDetailsMenuComponent } from '../components/Programs/program-details-menu/program-details-menu.component';
import { SettingsDetailsMenuComponent } from '../components/Settings/settings-details-menu/settings-details-menu.component';
import { ManagersTableComponent } from '../components/Management/managers-table/managers-table.component';
import { OperatorTableComponent } from '../components/Operators/operator-table/operator-table.component';
import { ProgramsComponent } from '../components/Programs/programs/programs.component';
import { SettingsComponent } from '../components/Settings/settings/settings.component';
import { OperatorsComponent } from '../components/Operators/operators/operators.component';
import { SettingsDetailsComponent } from '../components/Settings/settings-details/settings-details.component';
import { OperatorDetailsComponent } from '../components/Operators/operator-details/operator-details.component';
import { OperatorActivitiesComponent } from '../components/Operators/operator-activities/operator-activities.component';
import { OperatorActivityReportComponent } from '../components/Operators/operator-activity-report/operator-activity-report.component';
import { OperatorMessagesComponent } from '../components/Operators/operator-messages/operator-messages.component';
import { OperatorScheduleComponent } from '../components/Operators/operator-schedule/operator-schedule.component';
import { SettingTableComponent } from '../components/Settings/setting-table/setting-table.component';
import { SettingsScheduleComponent } from '../components/Settings/settings-schedule/settings-schedule.component';
import { SettingsMessagesComponent } from '../components/Settings/settings-messages/settings-messages.component';
import { ProgramsTableComponent } from '../components/Programs/programs-table/programs-table.component';
import { ProgramDetailsComponent } from '../components/Programs/program-details/program-details.component';
import { ProgramScheduleComponent } from '../components/Programs/program-schedule/program-schedule.component';
import { AfternoonComponent } from '../components/Afternoons/afternoon/afternoon.component';
import { AfternoonDetailsMenuComponent } from '../components/Afternoons/afternoon-details-menu/afternoon-details-menu.component';
import { AfternoonTableComponent } from '../components/Afternoons/afternoon-table/afternoon-table.component';
import { AfternoonDetailsComponent } from '../components/Afternoons/afternoon-details/afternoon-details.component';
import { AfternoonScheduleComponent } from '../components/Afternoons/afternoon-schedule/afternoon-schedule.component';

const appTable: Routes = [

  { path: "", component: LoginComponent },
  {
    path: "header-menu", component: HeaderMenuComponent,
    children: [
      {
        path: "management-menu", component: ManagementMenuComponent, children: [
          { path: "managers-table", component: ManagersTableComponent },
        ]
      },
      {
        path: "operators", component: OperatorsComponent,
        children: [
          { path: "operator-table", component: OperatorTableComponent },
          {
            path: 'operator-menu/:id', component: OperatorMenuComponent,
            children: [
              { path: "operator-details", component: OperatorDetailsComponent },
              { path: "operator-schedule", component: OperatorScheduleComponent },
              { path: "operator-activities", component: OperatorActivitiesComponent },
              { path: "operator-activity-report", component: OperatorActivityReportComponent },
              { path: "operator-messages", component: OperatorMessagesComponent },
            ]
          }
        ]
      },


      {
        path: "programs", component: ProgramsComponent,
        children: [
          { path: "programs-table", component: ProgramsTableComponent },
          {
            path: "programs-details-menu/:id", component: ProgramDetailsMenuComponent,
            children: [
              { path: "programs-details", component: ProgramDetailsComponent },
              { path: "programs-schedule", component: ProgramScheduleComponent },
              //{ path: "settings-messages", component: SettingsMessagesComponent },
            ]
          },
        ]
      },
      {
        path: "afternoon", component: AfternoonComponent,
        children: [
          { path: "afternoon-table", component: AfternoonTableComponent },
          {
            path: "afternoon-details-menu/:id", component: AfternoonDetailsMenuComponent,
            children: [
              { path: "afternoon-details", component: AfternoonDetailsComponent },
              { path: "afternoon-schedule", component: AfternoonScheduleComponent },
            ]
          },
        ]
      },
      {
        path: "settings", component: SettingsComponent,
        children: [
          { path: "setting-table", component: SettingTableComponent },
          {
            path: "settings-details-menu/:id", component: SettingsDetailsMenuComponent,
            children: [
              { path: "settings-details", component: SettingsDetailsComponent },
              { path: "settings-schedule", component: SettingsScheduleComponent },
              { path: "settings-messages", component: SettingsMessagesComponent },
            ]
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appTable),
    CommonModule
  ],
  declarations: []
})
export class RoutModule { }
