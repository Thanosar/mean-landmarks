import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HeaderModule} from '../../core/layouts/header/header.module';
import {RouterModule} from '@angular/router';
import {LoaderModule} from '../../core/layouts/loader/loader.module';
import {ModalModule} from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    LoaderModule,
    ModalModule
  ]
})
export class HomeModule { }
