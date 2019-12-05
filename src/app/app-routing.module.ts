import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'add-offer', component: AddOfferComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
