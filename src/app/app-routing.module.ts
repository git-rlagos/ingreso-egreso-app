import {RouterModule, Routes} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from "@angular/core";
import { RegisterComponent } from './auth/register/register.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: DashboardComponent,
    children:  dashboardRoutes
},
  {path: '**', redirectTo: ''},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
