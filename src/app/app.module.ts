import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoaderSpinerComponent } from './shared/loader-spiner/loader-spiner.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { Error500Component } from './errors/error500/error500.component';
import { DatePipe, TitleCasePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
import localeMXExtra from '@angular/common/locales/extra/es-MX';
import { Error404Component } from './errors/error404/error404.component';
import { PipesModule } from './pipes/pipes.module';
import { Error403Component } from './errors/error403/error403.component';
import { EasterEggComponent } from './errors/easter-egg/easter-egg.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    LoaderSpinerComponent,
    DashboardComponent,
    Error500Component,
    Error404Component,
    Error403Component,
    EasterEggComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule,
    SharedModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [
    DatePipe,
    TitleCasePipe,
    Title,
    { 
      provide: LOCALE_ID, 
      useValue: 'es-MX' 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localeMX, 'es-MX',localeMXExtra);
  }
}
