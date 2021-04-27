import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkValidDate'
})
export class CheckValidDatePipe implements PipeTransform {
  Hebcal = require('hebcal');

  transform(date:Date,fromTo:number,type:number) {
    if (type == 30)
    {
    if (fromTo == 1)//תאריך התחלתי
    {
//get the hebrew date
var day = new this.Hebcal.HDate(date);
debugger

//convert the number date to letters 
// return this.Hebcal.gematriya(day.getDate());
    }
  }
  }}
