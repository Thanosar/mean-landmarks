import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {SidenavModule} from '../sidenav/sidenav.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    SidenavModule,
    RouterModule
  ]
})
export class NavbarModule { }
