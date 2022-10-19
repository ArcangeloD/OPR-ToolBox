import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { RootGuard } from './root-guard.guard';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'home', title:environment.title, component: HomeComponent },
  { path: 'auth', title:environment.title+" - Register/Login", component: AuthComponent },
  { path: 'account', title:environment.title+" - My Account", component: AccountComponent, canActivate: [RootGuard] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }