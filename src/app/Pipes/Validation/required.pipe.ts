import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'required'
})
export class RequiredPipe implements PipeTransform {

  transform(value: any) {
    if(value==''||value==0)
    {return 'ערך נידרש';
  }
  }

}
