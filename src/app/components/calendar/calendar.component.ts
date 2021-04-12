import { Component, OnInit } from '@angular/core';
import {

  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Subject } from 'rxjs';
import { NgbCalendar, NgbCalendarHebrew, NgbDate, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DateFormatterParams,
} from 'angular-calendar';
import {
  CalendarDateFormatter,

  DAYS_OF_WEEK,
} from 'angular-calendar';
import { CustomDateFormatter } from '../Operators/operator-schedule/custom-date-formatter.provider';
import { formatDate, Time } from '@angular/common';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';
import { th } from 'date-fns/locale';
import { schedule } from 'src/app/Classes/schedule';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { element } from 'protractor';
import { Program } from 'src/app/Classes/program';
import { Operator } from 'src/app/classes/operator';
import { Setting } from 'src/app/classes/setting';
import { User } from 'src/app/classes/user';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },

    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

    { provide: NgbCalendar, useClass: NgbCalendarHebrew },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew }
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  model: NgbDateStruct;
  programsList: Program[] = [];
  view: string = 'month';
  operator: Operator = new Operator();
  operatorList: Operator[] = [];
  operatorSettings: Setting[] = [];
  settingsList: Setting[] = [];
  viewDate: Date = new Date();

  locale: string = 'he';

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY];

  viewChange = new EventEmitter<CalendarView>();

  viewDateChange = new EventEmitter<Date>();

  events: CalendarEvent[] = [];

  eventsFromSer: schedule[] = [];
  currentSetting: Setting = new Setting();
  currentProgram: Program = new Program();
  objName: string;

  setView(view: CalendarView) {
    this.view = view;
  }

  CalendarView = CalendarView;
  @Input() type: string;

  types = {
    iOperatorId: -1,
    iSettingId: -1,
    iProgramId: -1,
    dDate: null
    // dDate:new Date('11/08/2020')

  };

  programId: number = 0;
  settingId: number = 0;
  activity: number;
  date: string;
  time: Time;

  // constructor(private mainService: MainServiceService, private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
  //   this.dayTemplateData = this.dayTemplateData.bind(this);
  // }
  constructor(private router: Router, private route: ActivatedRoute,private mainService: MainServiceService) {
  }

  // dayTemplateData(date: NgbDate) {
  //   return {
  //     gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
  //   };
  // }

  // selectToday() {
  //   this.model = this.calendar.getToday();
  // }

  async ngOnInit() {
    this.operatorList = this.mainService.operatorsList;
    this.programsList = this.mainService.programsList;
    this.settingsList = this.mainService.settingsList;

    if (this.type == 'iOperatorId') {//import the operator by the id
      this.operator = this.mainService.operatorForDetails;
      this.objName = this.operator.nvOperatorName;
      this.types['iOperatorId'] = this.mainService.operatorForDetails.iOperatorId;
    }
    if (this.type == "iSettingId") {//import the setting by the id
      this.currentSetting = this.mainService.settingForDetails;
      this.types['iSettingId'] = this.mainService.settingForDetails.iSettingId;
      this.objName = 'מסגרת ' + this.currentSetting.nvSettingName;
    }
    if (this.type == "iProgramId") {//import the program by the id
      this.currentProgram = this.mainService.programForDetails;
      this.types['iProgramId'] = this.mainService.programForDetails.iProgramId;
      this.objName = 'תוכנית ' + this.currentProgram.nvProgramName;

    }
    //אם לא מפעיל/מסגרת/תוכנית חדשה
    //אז לקבל את האירועים ליומן 
    if (!(this.types['iSettingId'] == -1 && this.types['iProgramId'] == -1 && this.types['iOperatorId'] == -1)) {

      this.eventsFromSer = <schedule[]>await this.mainService.post("SchedulesGet", this.types);
debugger

    this.updateEventsL();
      console.log(this.events);

    }

    this.mainService.settingsList.forEach(element => {//fill the settings list where the op active.
      if (!this.operator.lSchoolsExcude.find(x => x == element.iSettingId)) {
        this.operatorSettings.push(element);
      }
    });

  }

  updateEventsL(){
    this.eventsFromSer.forEach(element => {
if(element.dtStartTime!=null)
{
        element.dtStartTime = new Date(parseInt((element.dtStartTime).toString().substr(6)));

}
else
{
  element.dtStartTime=new Date();
}
      this.events.push({
        id:element.iScheduleId,
        title: element.nvProgramValue,
        start: element.dtStartTime,
      });
    });

  }
  watch(date: any) {
  }
  flag: number = 0;
  ps: Setting;

  fillLists(str: string) {

    //מופעל רק בתוכניות וצהרונים
    //מילוי רשימת מפעילים שעובדים במיסגרת מסוימת שנבחרה לתוכנית
    if (this.eventToEdit.iSettingId != 0 && this.types["iOperatorId"] == -1) {
      //מאתחל את הרשימה הנוכחית
      this.operatorList = new Array<Operator>();
      //עובר על הרשימה של כל המפעילים
      this.mainService.operatorsList.forEach(operator => {
        //בודק לכל מפעיל אם עובד במסגרת הספציפית שנבחרה
        this.flag = operator.lSchoolsExcude.findIndex(s => s == this.eventToEdit.iSettingId);
        if (this.flag == -1) {
          //מוסיף לרשימה הנוכחית
          this.operatorList.push(operator);
        }
      });
    }
    //מופעל רק במפעילים
    //מילוי רשימת מסגרות שתואמות לתוכנית שנבחרה
    if (this.eventToEdit.iProgramId != -1 && str == 'program' && this.types["iSettingId"] == -1) {
      this.currentProgram = this.mainService.programsList.find(p => p.iProgramId == this.eventToEdit.iProgramId);
      //מאתחל את הרשימה הנוכחית
      this.settingsList = new Array<Setting>();
      //של המסגרות שמתאימות לתוכנית Idעובר על רשימת ה
      this.currentProgram.lProgramSettings.forEach(p => {
        //מקבל את המסגרת עצמה בתור אוביקט
        this.ps = this.mainService.settingsList.find(s => s.iSettingId == p);
        //בודק אם המפעיל הנוכחי פעיל במסגרת הזו
        var s = this.mainService.operatorForDetails.lSchoolsExcude.findIndex(s => s == this.ps.iSettingId);
        if (this.ps.iSettingId != -1 && s == -1) {
          //מוסיף לרשימה הנוכחית
          this.settingsList.push(this.ps);
        }
      }
      );
    }
    if (str == 'operator') {
      this.operator = this.mainService.operatorsList.find(p => p.iOperatorId == this.eventToEdit.iOperatorId);
    }
  }

  // resetArray() {
  //   this.eventsArrayByDate = new Array<schedule>();
  // }

  eventsArrayByDate: schedule[] = [];
  eventToEdit: schedule = new schedule();
  dayDetails: string;

  getShortDate(date: Date) {
    let hours = date.getHours();
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  createArrayForDetails(date: Date)//יצירת מערך להצגת פרטי אירועים ליום מסויים שנבחר
  {
    this.dayDetails = this.getShortDate(date);
    this.eventsArrayByDate = [];

    this.eventsFromSer.forEach(element => {

      if (this.getShortDate(new Date(element.dtStartTime)) == this.dayDetails)
        this.eventsArrayByDate.push(element);

    });

    console.log(this.eventsArrayByDate);

  }

  dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }

  weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }

  StartTime: Date = new Date();
  dTime: string;
  editEvent(e: schedule) {
    // this.dTime = e.dtStartTime.substr(16, 5);
    this.eventToEdit = this.eventsFromSer.find(x=>x.iScheduleId==e.iScheduleId);
debugger

  }
  //new Date(2015, 10, 10, 14, 57, 0)

  async addEditEvent(t: NgModel) {

    this.eventToEdit.dtStartTime.setHours(+t.viewModel.substr(0, 2));
    this.eventToEdit.dtStartTime.setMinutes(+t.viewModel.substr(3, 2));
    debugger

let res=<boolean> await this.mainService.post("ScheduleUpdate",{ iScheduleId: this.eventToEdit.iScheduleId,
 iOperatorId: this.eventToEdit.iOperatorId,
 iActivityId: this.eventToEdit.iActivityId,
 iSettingId: this.eventToEdit.iSettingId,
iProgramId: this.eventToEdit.iProgramId,
 dtStartTime: this.eventToEdit.dtStartTime
// bCopyAllWeeks: false,
// iUserId: this.mainService.currentUser.iUserId
});
  debugger
//  this.router.navigate(['./calendar'], { relativeTo: this.route });


  }
  resetEventToEdit() {
    this.eventToEdit = new schedule();
  }
}
