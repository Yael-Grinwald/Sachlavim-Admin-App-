import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'string'
})
export class StringPipe implements PipeTransform {

  transform(value: string) {

    var hasNumber = /\d/;
    debugger
    if (value.length <2) {
      debugger
      return ('ערך לא תקין')
    }

    if(hasNumber.test(value))
    {
      return ('הכנס ערך ללא מספרים');
    }
            
    
  }

}
