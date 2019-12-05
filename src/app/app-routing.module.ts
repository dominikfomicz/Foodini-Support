import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-offer', component: AddOfferComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
