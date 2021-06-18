import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe extends DecimalPipe implements PipeTransform {

  transform(value: number | string , ...args : any): any {
    let sizes = ['bytes' , 'KB', 'MB','GB'];
    let index = 0;
    value = Number(value);

    while(value > 1024){
      index++;
      value /= 1024;
    }

    let decimalValue = super.transform(value,'1.0-2');
    return decimalValue + ' ' + sizes[index];
  }

}
