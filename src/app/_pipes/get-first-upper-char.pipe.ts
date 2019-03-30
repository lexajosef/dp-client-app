import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFirstUpperChar'
})
export class GetFirstUpperCharPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.charAt(0).toUpperCase();
  }

}
