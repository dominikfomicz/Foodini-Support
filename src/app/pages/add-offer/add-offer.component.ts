import { Component, OnInit, ViewChild } from '@angular/core';

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


	constructor() { }

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
	}
}
