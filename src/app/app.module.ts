import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectionService } from './core/services/connection.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { AddCouponComponent } from './pages/add-coupon/add-coupon.component';
@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AddOfferComponent,
		AddCouponComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		MDBBootstrapModule.forRoot(),
		AppRoutingModule,
		HttpClientModule
	],
	providers: [ConnectionService, AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
