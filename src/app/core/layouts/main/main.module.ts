import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {NavbarModule} from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule
  ],
  exports: [MainLayoutComponent],
  declarations: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule {
}
