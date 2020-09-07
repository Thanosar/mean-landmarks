import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HeaderModule} from '../../core/layouts/header/header.module';
import {FooterComponent} from '../../core/layouts/footer/footer.component';



@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent
  ],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    HeaderModule
  ]
})
export class HomeModule { }
