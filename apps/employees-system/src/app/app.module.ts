import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FeatureEmployeesModule } from '@marshmallow-land/feature-employees';
import { DataAccessEployeesModule } from '@marshmallow-land/data-access-eployees';
import { FakeBackendInterceptor } from './fake-backend';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatureEmployeesModule, DataAccessEployeesModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
