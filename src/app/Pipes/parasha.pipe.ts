import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parasha'
})
export class ParashaPipe implements PipeTransform {


  //import Hebcal library
  Hebcal = require('hebcal');

  transform(date: Date): any {

    //get the hebrew date
    var day = new this.Hebcal.HDate(date);

    //check if Shabbat
    if(day.getDay()==6)
    {
      //return the Parasha name
      return day.getSedra('h')[0];
    }
  }

}
