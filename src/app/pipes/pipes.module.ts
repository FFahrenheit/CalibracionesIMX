import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from './error.pipe';
import { ResolutionPipe } from './resolution.pipe';



@NgModule({
  declarations: [
    ErrorPipe,
    ResolutionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPipe,
    ResolutionPipe
  ],
  providers: [
    ErrorPipe,
    ResolutionPipe
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
