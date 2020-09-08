import {CommonModule} from '@angular/common';
import {LandMarkRoutingModule} from './landmark-routing.module';
import {LandmarkViewComponent} from './landmark-view/landmark-view.component';
import {NgModule} from '@angular/core';
import {LoaderModule} from '../../core/layouts/loader/loader.module';
import {IconTitleComponent} from './components/icon-title/icon-title.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';


@NgModule({
  imports: [
    LandMarkRoutingModule,
    CommonModule,
    LoaderModule,
    LazyLoadImageModule,
  ],
  exports: [LandmarkViewComponent],
  declarations: [LandmarkViewComponent,
    IconTitleComponent
  ]
})
export class LandMarkModule {
}
