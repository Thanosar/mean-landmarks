import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {NavbarModule} from '../navbar/navbar.module';
import { HomeModule } from 'src/app/pages/home/home.module';
import {FooterComponent} from "../footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    HomeModule
  ],
  exports: [MainLayoutComponent],
  declarations: [
    MainLayoutComponent,
    FooterComponent
  ]
})
export class MainLayoutModule {
}
