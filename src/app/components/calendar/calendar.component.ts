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
import { formatDate } from '@angular/common';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';
import { th } from 'date-fns/locale';
import { schedule } from 'src/app/Classes/schedule';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { element } from 'protractor';

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
    { provide: NgbCalendar, useClass: NgbCalendarHebrew },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew }
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  model: NgbDateStruct;
  // constructor(private mainService: MainServiceService, private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
  //   this.dayTemplateData = this.dayTemplateData.bind(this);
  // }
  constructor(private mainService: MainServiceService) {
  }

  // dayTemplateData(date: NgbDate) {
  //   return {
  //     gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
  //   };
  // }

  // selectToday() {
  //   this.model = this.calendar.getToday();
  // }


  view: string = 'month';

  viewDate: Date = new Date();

  locale: string = 'he';

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY];

  viewChange = new EventEmitter<CalendarView>();

  viewDateChange = new EventEmitter<Date>();

  events: CalendarEvent[] = [];

  eventsFromSer: schedule[] = [];

  setView(view: CalendarView) {
    this.view = view;
  }

  CalendarView = CalendarView;
  @Input() type: number;
  @Input() calendarId: number;

  types = {
    iOperatorId: -1,
    iSettingId: -1,
    iProgramId: -1,
    dDate: null
    // dDate:new Date('11/08/2020')

  };

  ngOnInit() {
    this.types[this.type] = this.calendarId;

    this.mainService.post("SchedulesGet", this.types)
      .then(
        res => {

          this.eventsFromSer = res;

          this.eventsFromSer.forEach(element => {
            element.dtStartTime = new Date(parseInt(element.dtStartTime.substr(6))).toString();
            this.events.push({
              title: element.nvProgramValue,
              start: new Date(element.dtStartTime),


            });
          });

          console.log(this.events);

        },
        err => {
          alert("err SchedulesGet")
        }
      )
  }

  eventsArrayByDate: schedule[] = [];
  dayDetails: string;

  getShortDate(date: Date) {
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  createArrayForDetails(date: Date)//יצירת מערך להצגת פרטי אירועים ליום מסויים שנבחר
  {
    this.dayDetails = this.getShortDate(date);

    this.eventsFromSer.forEach(element => {
      console.log(new Date(element.dtStartTime));

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

}
