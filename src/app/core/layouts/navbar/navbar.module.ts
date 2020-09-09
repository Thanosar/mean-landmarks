import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {SidenavModule} from '../sidenav/sidenav.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
    imports: [
        CommonModule,
        SidenavModule,
        RouterModule,
        FormsModule
    ]
})
export class NavbarModule { }
