import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {SkyconsModule} from 'ngx-skycons';


@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        SkyconsModule
    ]
})
export class HeaderModule {
}
