import { CommonModule } from '@angular/common';
import { LandMarkRoutingModule } from './landmark-routing.module';
import { LandmarkViewComponent } from './landmark-view/landmark-view.component';
import { NgModule } from '@angular/core';
import {LoaderModule} from '../../core/layouts/loader/loader.module';


@NgModule({
    imports: [
        LandMarkRoutingModule,
        CommonModule,
        LoaderModule
    ],
    exports: [LandmarkViewComponent],
    declarations: [LandmarkViewComponent]
})
export class LandMarkModule {
}
