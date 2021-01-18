import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semaine ${weekNumber} en ${year}`;
  }
}