import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportLayoutComponent } from './pages/report-layout/report-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterCitizenComponent } from './pages/register-citizen/register-citizen.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterTownComponent } from './pages/register-town/register-town.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
  },
  {
    path: 'map',
    component: ReportLayoutComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register-citizen',
    component: RegisterCitizenComponent,
  },

  {
    path: 'register-town',
    component: RegisterTownComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
