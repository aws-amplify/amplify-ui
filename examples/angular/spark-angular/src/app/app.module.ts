import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SparkAngularModule } from '@aws-amplify/spark-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SparkAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
