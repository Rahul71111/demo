import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '@core';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
		{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		{
		path: 'dashboard',
		component: DashboardComponent,
		data: { title: 'Dashboard', titleI18n: 'dashboard' },
		},
		{
		path: 'sessions',
		loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
		data: { title: 'Sessions', titleI18n: 'Sessions' },
		},
		{ path: 'users', 
		loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
		{ path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
		{ path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
		{ path: 'banners', loadChildren: () => import('./banners/banners.module').then(m => m.BannersModule) },
		{ path: 'unites', loadChildren: () => import('./unites/unites.module').then(m => m.UnitesModule) },
		{ path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
		{ path: 'address', loadChildren: () => import('./address/address.module').then(m => m.AddressModule) },
		{ path: 'slots', loadChildren: () => import('./slot/slot.module').then(m => m.SlotModule) },
		{ path: 'offers', loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule) },
    { path: 'request', loadChildren: () => import('./request/request.module').then(m => m.RequestModule) },
    { path: 'processing-units', loadChildren: () => import('./processing-units/processing-units.module').then(m => m.ProcessingUnitsModule) },
    { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
    { path: 'trips', loadChildren: () => import('./trips/trips.module').then(m => m.TripsModule) },
    { path: 'franchise', loadChildren: () => import('./franchise/franchise.module').then(m => m.FranchiseModule) },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
