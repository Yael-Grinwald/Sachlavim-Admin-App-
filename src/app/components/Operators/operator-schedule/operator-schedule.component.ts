import {
  Component,
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
import { OnInit } from '@angular/core';
import {
  CalendarDateFormatter,

  DAYS_OF_WEEK,
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-operator-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './operator-schedule.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
  ],
  styleUrls: ['./operator-schedule.component.css'],

})

export class OperatorScheduleComponent implements OnInit {

  idOperator:number;
  constructor( private route: ActivatedRoute) { 
    this.idOperator = parseInt(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(){

  }
}
