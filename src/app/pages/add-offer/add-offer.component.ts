import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
export interface Restaurant {
	city: string;
	restaurantName: string;
	restaurantAddress: string;
	contact: string;
	type: string;
	openHour: string;
	closeHour: string;
	couponTitle: string;
	couponText: string;
	mainTags: {};
	secondaryTags: {};
}
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


	staticEditCoupon: Restaurant;

	constructor(private route: ActivatedRoute) {
		this.route.params.subscribe(
			(params) => {
				if (params.id) {
					this.couponTitle = 'Tytul kuponu';
					this.couponText = 'Text kuponu';
					this.count = 100;

					this.staticEditCoupon = {
						city: 'OPole',
						restaurantName: 'Pizza Hut',
						restaurantAddress: 'Fioolkowa',
						contact: '+481233333',
						type: 'Fast Food',
						openHour: '09:00',
						closeHour: '22:00',
						couponTitle: 'NOwy kupon',
						couponText: 'Nowy kupon -tekst',
						mainTags: [{
							value: 0, name: 'Pizza'
						}, {
							value: 1, name: 'Pasta'
						}, {
							value: 2, name: 'Parmesan'
						}],
						secondaryTags: [{
							value: 0, name: 'Napoje'
						}, {
							value: 1, name: 'Soki'
						}, {
							value: 2, name: 'Wigilie'
						}]
					};
				} else {
					this.staticEditCoupon = {
						city: '',
						restaurantName: '',
						restaurantAddress: '',
						contact: '',
						type: '',
						openHour: '',
						closeHour: '',
						couponTitle: '',
						couponText: '',
						mainTags: [],
						secondaryTags: []
					};
				}
			}
		)
	}

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
