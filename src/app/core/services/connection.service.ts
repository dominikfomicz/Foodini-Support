import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';

@Injectable({
	providedIn: 'root'
})
export class ConnectionService {

	constructor(private http: HttpClient, private router: Router, private alert: AlertService) { }

	mainUrl = 'https://repo.foodini.net.pl/bifrost/';

	httpOptions = {};
	authOptions = { headers: new HttpHeaders({
					'Authorization': 'Basic YXV0aHNlcnZlcjpEamlKOTltR0NkeDVsa1VEM0I=',
					'Content-Type': 'application/x-www-form-urlencoded'
				})};

	setToken(token: string) {
		localStorage.setItem('token', token);

		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + this.getToken(),
				'Content-Type': 'application/json;charset=utf-8'
			})
		};
	}

	getToken() {
		return localStorage.getItem('token');
	}

	login(username: string, password: string) {
		const post_data = new HttpParams()
		.set('username', username)
		.set('password', password)
		.set('grant_type', 'password');

		return this.http.post(this.mainUrl + 'oauth/token', post_data, this.authOptions).subscribe(
			(data) => {
				if (data && data['access_token']) {
					console.log(data['access_token']);
					this.setToken(data['access_token']);
        }
				return this.router.navigateByUrl('add-restaurant');
			},
			response => {
        this.alert.alertError(response.message);
				console.log(response);
			});
	}

	getDataByPost(url: String, post_data: any) {
		return this.http.post(this.mainUrl + url, post_data, this.httpOptions)
			.pipe(
				(data => {
					return data;
				}),
				catchError(error => {
					if (error.status === 401) {
						this.showError(error.statusText);
					} else if (error.status === 404) {
						this.showError(error.statusText);
					} else if (error.staatus === 500) {
						this.showError(error.statusText);
					} else {
						this.showError(error.statusText);
					}
					return throwError(error);
				})
			);
	}

	getDataByGet(url: String) {

		return this.http.get(this.mainUrl + url, this.httpOptions)
			.pipe((data => {
					return data;
				}),
				catchError(error => {
					if (error.status === 401) {
						this.showError(error.statusText);
					} else if (error.status === 404) {
						this.showError(error.statusText);
					} else if (error.status === 500) {
						this.showError(error.statusText);
					} else {
						this.showError(error.statusText);
					}
					return throwError(error);
				})
			);
	}

	logout() {
		return this.getDataByGet('/logout')
					.subscribe(data => {
							this.router.navigateByUrl('');
					});
	}

	showError(message) {
		Swal.fire({
			title: 'Error!',
			text: message,
			icon: 'error',
			confirmButtonText: 'Cool'
		});
	}
}

