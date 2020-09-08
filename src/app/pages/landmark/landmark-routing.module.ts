
import {LandmarkViewComponent} from './landmark-view/landmark-view.component';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: ":id",
        component: LandmarkViewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandMarkRoutingModule {
}
