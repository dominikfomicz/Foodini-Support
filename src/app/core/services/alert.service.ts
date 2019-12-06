import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	private deleteRestaurant = new BehaviorSubject(false);
	currentDeleteRestaurant = this.deleteRestaurant.asObservable();

	constructor() { }

	alertError(message) {
		Swal.fire('', message, 'error');
	}

	alertSuccess(message) {
		Swal.fire('', message, 'success');
	}

	alertQuestion(message) {
		let promise;
		promise = new Promise( (res, rej) => {
			Swal.fire({
				title: 'Jesteś pewien?',
				text: message,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Anuluj',
				confirmButtonText: 'Tak'
			}).then((result) => {
				// return result.value;
				// this.deleteRestaurant.next(result.value);
				console.log(result);
				if (result.value) {
					res(result.value);
				} else {
					res(result.dismiss);
				}
			});
		});
		return promise;
	}
}
