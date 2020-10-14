import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  imports: [CommonModule, HttpClientModule, AkitaNgDevtools.forRoot()]
})
export class DataAccessEployeesModule {}
