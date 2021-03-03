import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {


  transform(value: string) {

    var isPhone = /^(0[0-9]{1,2}-[0-9]{7}$)/;

 
    if (isPhone.test(value) == false) {
      return 'הכנס ערך תקין הכולל: - ';
    }
  }

}
