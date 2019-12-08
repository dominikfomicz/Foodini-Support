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

	public items: any = [
	{id: 1, name: 'PIZZA HUT' },
	{id: 2, name: 'ZDROWA KROWA' },
	{id: 3, name: 'PUB OSTRÓWEK' },
	{id: 4, name: 'SHANTI' },
	{id: 5, name: 'TULSI' },
	{id: 6, name: 'KOFEINA 2.0x' },
	{id: 7, name: 'SMAKOBAO' },
	{id: 8, name: 'SAN ESCOBAR' },
	{id: 9, name: 'TYLKO PIZZA' },
	{id: 10, name: 'FRYTKARNIA' },
	{id: 11, name: 'FABUŁA' }];

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

	onEditClick(id){
		this.router.navigateByUrl('edit-restaurant/' + id);
	}

	ngOnInit() {
		this.connection.getDataByGet('lokal/all?idMiasta=OQ==').subscribe(data => {
			console.log(data);
		});
	}

}
