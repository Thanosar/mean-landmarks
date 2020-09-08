import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainLayoutModule} from './core/layouts/main/main.module';
import {NavbarModule} from './core/layouts/navbar/navbar.module';
import {HomeModule} from './pages/home/home.module';
import {HttpClientModule} from '@angular/common/http';
import { LoaderModule } from './core/layouts/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    NavbarModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
