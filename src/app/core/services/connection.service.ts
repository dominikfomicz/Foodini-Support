import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ConnectionService {
	mainUrl = 'http://repo.foodini.net.pl/';

	httpOptions = {};

	constructor(private http: HttpClient, private router: Router, private alert: AlertService) {

	}



	setToken(token: string) {
		localStorage.setItem('token', token);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	login(username: string, password: string) {
		const post_data = new HttpParams()
			.set('username', username)
			.set('password', password)
			.set('client_id', '1')
			.set('client_secret', 'wYp5wj6LRF6zE8M2DAQofcOUAc7JHeGVlFF5P8au')
			.set('scope', '')
			.set('grant_type', 'password');

		return this.http.post('http://repo.foodini.net.pl/oauth/token', post_data, this.httpOptions);
	}

	getDataByPost(url: String, post_data: any) {
		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.getToken(),
				'Content-Type': 'application/json;charset=utf-8'
			})
		};

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

	addLocal(url: String, post_data: any, headers) {
		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.getToken(),
				'Accept': 'application/json'
			}
			)
		};

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
		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.getToken(),
				'Content-Type': 'application/json;charset=utf-8'
			})
		};

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

	selectItem(app_list_string) {
		return this.getDataByPost('tools/getList', {app_list_string: app_list_string});
	}

	showError(message) {
		Swal.fire({
			title: '',
			text: message,
			icon: 'error',
			confirmButtonText: 'Ok'
		})
		.then((result) => {
			if (result.value) {
				localStorage.clear();
				this.router.navigateByUrl('login');
			}
		});

	}
	test(data) {
		return this.http.post('https://webhook.site/a8d1ab33-af3f-4466-a60d-445166dce1dc', data);
	}
}

