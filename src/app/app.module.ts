import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { AgGridModule } from 'ag-grid-angular';


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectionService } from './core/services/connection.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { AddCouponComponent } from './pages/add-coupon/add-coupon.component';
import { ListRestaurantsComponent } from './pages/list-restaurants/list-restaurants.component';
import { AlertService } from './core/services/alert.service';
import { ListCouponsComponent } from './pages/list-coupons/list-coupons.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AddOfferComponent,
		AddCouponComponent,
		ListRestaurantsComponent,
		ListCouponsComponent,
	],
	imports: [
		TagInputModule,
		BrowserModule,
		FormsModule,
		MDBBootstrapModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AgGridModule.withComponents([
		])
	],
	providers: [ConnectionService, AuthService, AuthGuard, AlertService],
	bootstrap: [AppComponent]
})
export class AppModule { }
