import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  transform(value: string) {

    debugger
    var mail = /[A-Za-z0-9-]+@+[A-Za-z]+\.+[A-Za-z]/;
    debugger
    if (mail.test(value) == false) {
      return ('כתובת מייל לא תקינה')
    }
  }

}
