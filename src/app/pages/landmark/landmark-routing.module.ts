import {LandmarkViewComponent} from './landmark-view/landmark-view.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LandmarkEditComponent} from './landmark-edit/landmark-edit.component';
import {AuthGuard} from '../../core/guard/auth.guard';

const routes: Routes = [
  {
    path: ':id',
    component: LandmarkViewComponent,
  },
  {
    path: ':id/edit',
    canActivate: [AuthGuard],
    component: LandmarkEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandMarkRoutingModule {
}
