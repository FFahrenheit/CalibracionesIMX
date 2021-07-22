import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(value: string): string{
    if(value.toUpperCase().includes('NA') && value.includes('-')){
      return 'N/A';
    }
    if (!value.toUpperCase().includes('N/A') && value != 'Certificado'
    && !value.toUpperCase().includes('NA')){
      return '± ' + value;
    }
    return value;
  }

}
