import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { AuthGuard } from './core/services/auth.guard';
import { AddCouponComponent } from './pages/add-coupon/add-coupon.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'add-restaurant', component: AddOfferComponent, canActivate: [AuthGuard]},
  { path: 'add-coupon', component: AddCouponComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
