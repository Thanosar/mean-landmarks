import {CommonModule} from '@angular/common';
import {LandMarkRoutingModule} from './landmark-routing.module';
import {LandmarkViewComponent} from './landmark-view/landmark-view.component';
import {NgModule} from '@angular/core';
import {LoaderModule} from '../../core/layouts/loader/loader.module';
import {IconTitleComponent} from './components/icon-title/icon-title.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import { LandmarkEditComponent } from './landmark-edit/landmark-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';


@NgModule({
  imports: [
    LandMarkRoutingModule,
    CommonModule,
    LoaderModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  exports: [LandmarkViewComponent],
  declarations: [LandmarkViewComponent,
    IconTitleComponent,
    LandmarkEditComponent
  ]
})
export class LandMarkModule {
}
