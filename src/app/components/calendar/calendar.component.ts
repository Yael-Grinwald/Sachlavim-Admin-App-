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

  constructor(private mainService: MainServiceService, private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
  }

  dayTemplateData(date: NgbDate) {
    return {
      gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
    };
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }


  view: string = 'month';

  viewDate: Date = new Date();

  locale: string = 'he';

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY];

  viewChange = new EventEmitter<CalendarView>();

  viewDateChange = new EventEmitter<Date>();

  events: CalendarEvent[];

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
  };

  ngOnInit() {
    this.types[this.type]=this.calendarId;

    this.mainService.post("SchedulesGet", this.types)
      .then(
        res => {
        let eventsFromSer = res;
          debugger
        },
        err => {
          alert("err SchedulesGet")
        }
      )

      this.events= [
        {
          title: 'An all day event',
          color: colors.yellow,
          start: new Date(),
          allDay: true,
        },
        {
          title: 'A non all day event',
          color: colors.blue,
          start: new Date(),
        },
      ];
      
  }

  dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }

  weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}
