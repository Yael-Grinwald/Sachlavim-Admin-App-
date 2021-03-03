import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parasha'
})
export class ParashaPipe implements PipeTransform {
  Hebcal = require('hebcal');

  transform(date: Date): any {

    var day = new this.Hebcal.HDate(date);

    if(day.getDay()==6)
    {
      return day.getSedra('h')[0];

    }
  }

}
