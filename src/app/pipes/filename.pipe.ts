import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  transform(value: string): string {
    let filename = value.split("-");
    filename.splice(0,1);
    return filename.join("-");
  }

}
