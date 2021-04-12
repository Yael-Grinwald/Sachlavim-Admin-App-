import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hebrewDate'
})
export class HebrewDatePipe implements PipeTransform {
  
  //import Hebcal library
  Hebcal = require('hebcal');

  transform(date: Date): any {
//get the hebrew date
    var day = new this.Hebcal.HDate(date);
        //convert the number date to letters 
    return this.Hebcal.gematriya(day.getDate());
    }

}
