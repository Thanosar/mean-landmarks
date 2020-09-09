import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './core/layouts/main/main.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuard} from './core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'landmark',
            canActivate: [AuthGuard],
            loadChildren: () => import('./pages/landmark/landmark.module').then(m => m.LandMarkModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
