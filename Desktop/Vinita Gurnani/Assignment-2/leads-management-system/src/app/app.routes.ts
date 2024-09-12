import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'leads',
    loadComponent: () =>
      import('./Mycomponent/leads/leads.component').then(
        (m) => m.LeadsComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Mycomponent/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export default routes;
