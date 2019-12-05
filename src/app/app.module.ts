import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AddOfferComponent
	],
	imports: [
		BrowserModule,
		MDBBootstrapModule.forRoot(),
		AppRoutingModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
