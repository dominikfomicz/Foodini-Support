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

	constructor(public alert: AlertService, public router: Router, public connection: ConnectionService) { }

	onDeleteClick(id) {
		this.alert.alertQuestion('Czy napewno chcesz usunąć lokal?').then(
			callback => {
				if (callback === true) {
				// 	this.connection.getDataByPost('',).subscribe(data => {
				// 		console.log(data);
				// })
				}
			}
		);
	}

	onEditClick(id) {
		this.router.navigateByUrl('edit-restaurant/' + id);
	}

	ngOnInit() {
		this.connection.getDataByGet('local/all?idMiasta=1').subscribe(data => {
			this.items = data;
		});
	}

}
