import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from './error.pipe';
import { ResolutionPipe } from './resolution.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';



@NgModule({
  declarations: [
    ErrorPipe,
    ResolutionPipe,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPipe,
    ResolutionPipe,
    SanitizeHtmlPipe
  ],
  providers: [
    ErrorPipe,
    ResolutionPipe,
    SanitizeHtmlPipe
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
