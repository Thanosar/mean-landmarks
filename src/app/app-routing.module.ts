import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './core/layouts/main/main.component';
import {HomeComponent} from './pages/home/home.component';


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
            loadChildren: () => import('./pages/landmark/landmark.module').then(m => m.LandMarkModule)
          }
        ]
      },
      /*{
        path: 'auth',
        component: SimpleLayoutComponent,
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
        ]
      },*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
