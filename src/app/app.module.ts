import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { AgGridModule } from 'ag-grid-angular';


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectionService } from './core/services/connection.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { ListRestaurantsComponent } from './pages/list-restaurants/list-restaurants.component';
import { AlertService } from './core/services/alert.service';
import { ListCouponsComponent } from './pages/list-coupons/list-coupons.component';
import { TagsComponent } from './pages/tags/tags.component';


import { NgSelectModule } from '@ng-select/ng-select';
import { ListTagsComponent } from './pages/list-tags/list-tags.component';
import { LoaderComponent } from './components/loader/loader.component';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RestaurantsComponent,
		CouponsComponent,
		ListRestaurantsComponent,
		ListCouponsComponent,
		TagsComponent,
		ListTagsComponent,
		LoaderComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		MDBBootstrapModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AgGridModule.withComponents([
		]),
		NgSelectModule,
		SelectDropDownModule
	],
	providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, ConnectionService, AuthService, AuthGuard, AlertService],
	bootstrap: [AppComponent]
})
export class AppModule { }
