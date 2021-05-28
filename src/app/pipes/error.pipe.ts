import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(value: string): string{
    if (value != 'N/A'){
      return '± ' + value;
    }
    return value;
  }

}
