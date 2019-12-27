import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
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
	selector: 'app-restaurants',
	templateUrl: './restaurants.component.html',
	styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
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
		value: 0, name: 'Pizza', disabled: false
	}, {
		value: 1, name: 'Pasta', disabled: false
	}, {
		value: 2, name: 'Parmesan', disabled: false
	}, {
		value: 2, name: 'Test2', disabled: false
	}, {
		value: 2, name: 'test3', disabled: false
	}];

	secondaryTags = [{
		value: 0, name: 'Makaron', disabled: false
	}, {
		value: 1, name: 'Makaron2', disabled: false
	}, {
		value: 2, name: 'Makaron3', disabled: false
	}];

	days = [
		{
			id_const_name: 1,
			day_name: 'Poniedziałek',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		},
		{
			id_const_name: 2,
			day_name: 'Wtorek',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		},
		{
			id_const_name: 3,
			day_name: 'Środa',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		},
		{
			id_const_name: 4,
			day_name: 'Czwartek',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		},
		{
			id_const_name: 5,
			day_name: 'Piątek',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		},
		{
			id_const_name: 6,
			day_name: 'Sobota',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		},
		{
			id_const_name: 7,
			day_name: 'Niedziela',
			kitchen_from: null,
			kitchen_to: null,
			local_from: null,
			local_to: null,
			delivery_from: null,
			delivery_to: null,
		}
	];
	selectedDay = false;
	selectedDayId = 0;
	delivery = false;
	eatInLocal = false;
	pickUpLocal = false;
	tags = [];
	selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

	selectedMainTags;
	disabledMainTags = false;
	selectedSecondaryTags;
	disabledSecondaryTags = false;

	staticEditCoupon: Restaurant;
	cities = [{
		name: 'Opole'
	},{
		name: 'Wrocław'
	}];

	constructor(private route: ActivatedRoute, public connection: ConnectionService) {
		// this.connection.selectItem('CityConstType').subscribe(data => {
		// 	this.cities = data;
		// 	console.log(this.cities);
		// });
		this.route.params.subscribe(
			(params) => {
				if (params.id) {
					this.couponTitle = 'Tytul kuponu';
					this.couponText = 'Text kuponu';
					this.count = 100;

					this.staticEditCoupon = {
						city: 'Opole',
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
		);
	}

	ngOnInit() {
	}

	sendData() {
		// console.log(this.tags);
		// console.log(this.selectedSecondaryTags);
		console.log({
			details: {
				city: this.staticEditCoupon.city,
				restaurantName: this.staticEditCoupon.restaurantName,
				restaurantAddress: this.staticEditCoupon.restaurantAddress,
				contact: this.staticEditCoupon.contact,
				type: this.staticEditCoupon.type,
			},
			tags: this.tags,
			dayOpen: this.days
		});
		this.connection.getDataByPost('/lokal/new', [{
			idCity: 'OQ=='
		}]).subscribe(data => {
			console.log(data);
		});
	}
	selectDay(el, i) {
		this.selectedDayId = i;
		// this.selectedDay = true;
		// this.selectedDayId = el > 0 ? el - 1 : el;
	}
	selectMainTags(value) {
		console.log(value[0].value);
		if (this.selectedMainTags.length < 3) {
			this.tags.push({
				id: value[0].value,
				priority_status: true
			});
		}
	}

	selectSecondaryTags(value) {
		console.log(value);
		this.tags.push({
			id: value[0].value,
			priority_status: false
		});
	}
}
