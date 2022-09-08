import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [Role.Admin, Role.Editor],
        redirectTo: {
          navigationCommands: ['**'],
          navigationExtras: {
            skipLocationChange: true,
          },
        },
      },
    },
    component: AdminComponent,
  },
  {
    path: 'login',

    component: LoginComponent,
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
