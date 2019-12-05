import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-add-offer',
	templateUrl: './add-offer.component.html',
	styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
	city: string;


	constructor() { }

	ngOnInit() {
		console.log(this.city);
	}

	sendData() {
		alert(this.city);
	}
}
