import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection.service';

@Component({
	selector: 'app-add-offer',
	templateUrl: './add-offer.component.html',
	styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
	city: string;
	restaurantName: string;
	restaurantAddress: string;
	contact: string;
	type: string;
	openHour: number;
	closeHour: number;
	coupon = [];
	couponTitle: string;
	couponText: string;
	count: number;
	mainTags = [{
		value: 0, name: 'Pizza'
	}, {
		value: 1, name: 'Pasta'
	}, {
		value: 2, name: 'Parmesan'
	}];
	secondaryTags =  [{
		value: 0, name: 'Napoje'
	}, {
		value: 1, name: 'Soki'
	}, {
		value: 2, name: 'Wigilie'
	}];

	constructor(connection: ConnectionService) { }

	ngOnInit() {
		console.log(this.city);
	}

	sendData() {
		console.log({
			city: this.city,
			restaurantName: this.restaurantName,
			restaurantAddress: this.restaurantAddress,
			contact: this.contact,
			type: this.type,
			openHour: this.openHour,
			closeHour: this.closeHour,
		});
		// this.connection.getDataByPost();
	}
}
