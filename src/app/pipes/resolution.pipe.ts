import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolution'
})
export class ResolutionPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if(value.toUpperCase() != 'N/A' && value.toUpperCase() != 'NA'){
      return value + ' - ' + args[0]
    }
    return value;
  }

}
