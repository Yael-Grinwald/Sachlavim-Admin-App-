import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mySearch'
})
export class MySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(x => 
       x.nvOperatorName.indexOf(args) != -1 
    && x.nvContactPerson.indexOf(args) != -1
    && x.nvOperatorTypeValue.indexOf(args) != -1
    && x.nvCompanyName.indexOf(args) != -1
    && x.nvActivityies.indexOf(args) != -1
    && x.nvIdentity.indexOf(args) != -1 
    && x.nvContactPersonPhone.indexOf(args) != -1
    && x.nvContactPersonMail.indexOf(args) != -1
    && x.bInProgramPool.indexOf(args) != -1);
  }
}
