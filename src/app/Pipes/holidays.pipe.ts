import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holidays'
})
export class HolidaysPipe implements PipeTransform {

  Hebcal = require('hebcal');

  transform(date: Date): any {

    var day = new this.Hebcal.HDate(date);
    var string: string = '';
    if (day.holidays(true).length > 1) {
      {

        if (day.holidays(true)[0].getDesc('h').includes('שבת') == false) {
          
          return day.holidays(true)[0].getDesc('h');

        }


      }
    }

  }
}
