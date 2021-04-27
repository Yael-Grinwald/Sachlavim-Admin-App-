import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hebrewDate'
})
export class HebrewDatePipe implements PipeTransform {
  
  //import Hebcal library
  Hebcal = require('hebcal');

  transform(date: Date): any {
    debugger
    if((typeof date)=="string"){
    date=new Date(date);
    var day = new this.Hebcal.HDate(date);
    console.log("day: "+day );

    console.log("day.getDay(): "+day.getDay() );
    console.log( "day.getMonth(): "+day.getMonth());
    return this.Hebcal.gematriya(day.getDate()+" "+day.getMonth());

    }
//get the hebrew date
    var day = new this.Hebcal.HDate(date);
    
        //convert the number date to letters 
    return this.Hebcal.gematriya(day.getDate());
    }

}
