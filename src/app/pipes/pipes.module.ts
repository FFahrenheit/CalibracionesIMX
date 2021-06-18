import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from './error.pipe';
import { ResolutionPipe } from './resolution.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { SizePipe } from './size.pipe';
import { FilenamePipe } from './filename.pipe';



@NgModule({
  declarations: [
    ErrorPipe,
    ResolutionPipe,
    SanitizeHtmlPipe,
    SizePipe,
    FilenamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPipe,
    ResolutionPipe,
    SanitizeHtmlPipe,
    SizePipe,
    FilenamePipe
  ],
  providers: [
    ErrorPipe,
    ResolutionPipe,
    SanitizeHtmlPipe,
    SizePipe,
    FilenamePipe
  ]
})
export class PipesModule { 
  static forRoot(){
    return {
      ngModule: PipesModule,
      providers: [],
    }
  }
}
