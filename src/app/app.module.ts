import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainLayoutModule} from './core/layouts/main/main.module';
import {NavbarModule} from './core/layouts/navbar/navbar.module';
import {HomeModule} from './pages/home/home.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {LazyLoadImageModule,} from 'ng-lazyload-image';
import {AuthInterceptor} from './core/interceptors/HttpInterceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    NavbarModule,
    HomeModule,
    HttpClientModule,
    LazyLoadImageModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AppModule { }
