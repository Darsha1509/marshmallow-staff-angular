import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { AppComponent } from './app.component';
import { FakeBackendInterceptor } from './fake-backend';
import { FeatureMarshmallowContainerModule } from '@marshmallow-land/feature-marshmallow-container';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatureMarshmallowContainerModule, HttpClientModule, AkitaNgDevtools.forRoot()],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
