import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { AuthGuard } from './core/services/auth.guard';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { ListRestaurantsComponent } from './pages/list-restaurants/list-restaurants.component';
import { ListCouponsComponent } from './pages/list-coupons/list-coupons.component';
import { TagsComponent } from './pages/tags/tags.component';
import { ListTagsComponent } from './pages/list-tags/list-tags.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'list-restaurants', component: ListRestaurantsComponent, canActivate: [AuthGuard]},
  { path: 'list-coupons', component: ListCouponsComponent, canActivate: [AuthGuard]},
  { path: 'add-restaurant', component: RestaurantsComponent, canActivate: [AuthGuard]},
  { path: 'add-coupon', component: CouponsComponent, canActivate: [AuthGuard]},
  { path: 'edit-restaurant/:id', component: RestaurantsComponent, canActivate: [AuthGuard]},
  { path: 'edit-coupon/:id', component: CouponsComponent, canActivate: [AuthGuard]},
  { path: 'edit-tag/:id', component: TagsComponent, canActivate: [AuthGuard]},
  { path: 'add-tags', component: TagsComponent, canActivate: [AuthGuard]},
  { path: 'list-tags', component: ListTagsComponent, canActivate: [AuthGuard]}


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
