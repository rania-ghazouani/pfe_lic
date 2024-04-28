import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { InterventionComponent } from './intervention/intervention.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path: 'forgot', component: ForgotComponent},
  {path: 'reset/:token', component: ResetComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'product-list', component: ProductListComponent, canActivate: [RoleGuard]},
  {path: 'navigation', component: NavigationComponent },
  {path: 'intervention', component: InterventionComponent},
  {path: 'profil', component: ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
