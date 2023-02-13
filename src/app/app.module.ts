import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TotalstatsComponent } from './totalstats/totalstats.component';
import { StatedataComponent } from './statedata/statedata.component';
import { CompareComponent } from './compare/compare.component';
import { AlertComponent } from './alert/alert.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    TotalstatsComponent,
    StatedataComponent,
    CompareComponent,
    AlertComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
