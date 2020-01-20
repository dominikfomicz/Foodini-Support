import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public username = '';
	public password = '';
	public showLogin = false;
	constructor(public service: ConnectionService, public router: Router, public alert: AlertService) {}

	login() {
		// console.log(this.username, this.password);
		this.showLogin = true;
		this.service.login(this.username, this.password).subscribe(
			(data) => {
				if (data && data['access_token']) {
					console.log(data['access_token']);
					this.service.setToken(data['access_token']);
					this.showLogin = false;
					this.alert.alertSuccess('Zostałeś zalogowany!');
				} else {

					this.alert.alertSuccess('Nie zostałeś zalogowany!');
				}
				return this.router.navigateByUrl('/add-restaurant');
			},
			response => {
				console.log(response);
				if (response.status === 401) {
					this.service.showError(response.error.message || response.statusText);
				} else if (response.status === 404) {
					this.service.showError(response.error.message || response.statusText);
				} else if (response.status === 500) {
					this.service.showError(response.error.message || response.statusText);
				} else {
					this.service.showError(response.error.message || response.statusText);
				}
				// if (response.)
			});
	}

	ngOnInit() {}

}
