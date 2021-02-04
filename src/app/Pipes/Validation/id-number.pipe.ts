import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idNumber'
})
export class IdNumberPipe implements PipeTransform {

  transform(value: string) {
    var idNumber = /[0-9]{9}/;
    if (idNumber.test(value) == false) {
      return ('ערך לא תקין')
    }
  }
}
