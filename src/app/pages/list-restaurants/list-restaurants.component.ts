import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';

@Component({
	selector: 'app-list-restaurants',
	templateUrl: './list-restaurants.component.html',
	styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent implements OnInit {
	subscription: Subscription;

	public items: any = [];
	showLogin = true;
	constructor(public alert: AlertService, public router: Router, public connection: ConnectionService) {}

	ngOnInit() {
		this.connection.getDataByPost('tools/getList', { app_list_string: 'LocalDataMain' }).subscribe(data => {
			this.items = data;
			console.log(data);
			this.showLogin = false;
		});
	}

	onDeleteClick(id) {
		this.alert.alertQuestion('Czy napewno chcesz usunąć lokal?').then(callback => {
			if (callback === true) {
				this.connection.getDataByPost('/locals/removeLocal', { id_local_data_main: id }).subscribe(data => {
					console.log(data);
					this.router.navigateByUrl('list-restaurants');
				});
			}
		});
	}

	onEditClick(id) {
		this.router.navigateByUrl('edit-restaurant/' + id);
	}
}
