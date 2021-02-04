import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hebrewDate'
})
export class HebrewDatePipe implements PipeTransform {
  
  Hebcal = require('hebcal');

  transform(date: Date): any {

    var day = new this.Hebcal.HDate(date);
    return this.Hebcal.gematriya(day.getDate());
    }

}
