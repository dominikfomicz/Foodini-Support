import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Restaurant } from '../../model/restaurant';
import { AlertService } from 'src/app/core/services/alert.service';
import {NgForm} from '@angular/forms';

@Component({
	selector: 'app-restaurants',
	templateUrl: './restaurants.component.html',
	styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
	@ViewChild('cityName', {static: false}) cityName: any;
	@ViewChild('checkbox', {static: false}) checkbox: any;
	logo: File;
	background: File;
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

	open_hours = [
		{
			id_week_day: 1,
			day_name: 'Poniedziałek',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 2,
			day_name: 'Wtorek',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 3,
			day_name: 'Środa',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 4,
			day_name: 'Czwartek',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 5,
			day_name: 'Piątek',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 6,
			day_name: 'Sobota',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 7,
			day_name: 'Niedziela',
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		}
	];
	selectedDay = false;
	selectedDayId = 0;
	// delivery = false;
	// eatInLocal = false;
	// pickUpLocal = false;
	tags = [];
	selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

	selectedMainTags;
	disabledMainTags = false;
	selectedSecondaryTags;
	disabledSecondaryTags = false;

	// staticEditCoupon: [];
	cities;


	// local_data object
	local_data = {
		name: '',
		address: '',
		id_city_const_type: '',
		phone_number: 0,
		description: '',
		other_info: '',
		facebook_url: '',
		instagram_url: '',
		delivery: false,
		eat_in_local: false,
		pick_up_local: false,
		cash_payment: false,
		creditcards_payment: false,
		contactless_payment: false,
		blik_payment: false,
		delivery_range: 0
	};

	id_local_data_main: string = '-1';

	tagList;

	usedTags = [];
	myFormData = new FormData();
	uploadedLogo;
	uploadedBackground;
	constructor(private router: Router, private route: ActivatedRoute, public connection: ConnectionService, public alert: AlertService) {
		this.connection.selectItem('CityConstType').subscribe(data => {
			this.cities = data;
			console.log(this.cities);
		});
		this.route.params.subscribe(
			(params) => {
				if (params.id) {
					this.id_local_data_main = params.id;
				}
			}
		);
	}

	ngOnInit() {
		this.connection.getDataByGet('/tags/getList').subscribe(data => {
			// this.tagList = data.map(
			// 	element => {
			// 		element.disabled = false;
			// 		return element;
			// 	}
			// );

			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					data[key].disabled = false;
				}
			}
			this.tagList = data;
			console.log(data);
		});
	}
	// getData(id) {
	// 	this.connection.getDataByGet('/locals/getList/' + id).subscribe((data: Restaurant) => {
	// 		// this.items = data;
	// 		console.log(data);
	// 		this.local_data = {
	// 			name: data.name,
	// 			address: data.address,
	// 			id_city_const_type: data.id_city_const_type,
	// 			phone_number: data.phone_number,
	// 			description: data.description,
	// 			other_info: data.other_info,
	// 			facebook_url: data.facebook_url,
	// 			instagram_url: data.instagram_url,
	// 			delivery: data.delivery,
	// 			eat_in_local: data.eat_in_local,
	// 			pick_up_local: data.pick_up_local,
	// 			cash_payment: data.cash_payment,
	// 			creditcards_payment: data.creditcards_payment,
	// 			contackless_payment: data.contackless_payment,
	// 			blik_payment: data.blik_payment
	// 		};
	// 		console.log(this.cityName);
	// 		// console.log([data.id_city_const_type].select(this.cities[data.id_city_const_type].value))
	// 	});
	// }
	sendData() {
		// console.log(this.filedata.name)
		// console.log({
		// 	id_local_data_main: this.id_local_data_main ? this.id_local_data_main : '-1', image: this.filedata
		// });
		// console.log({id_local_data_main: this.id_local_data_main ? this.id_local_data_main : '-1',
		// local_data: JSON.stringify(this.local_data), tags: JSON.stringify(this.tags), open_hours: JSON.stringify(this.open_hours),
		//  image: this.myFormData});
		// console.log(this.tags);
		this.myFormData.append('id_local_data_main', this.id_local_data_main);
		this.myFormData.append('local_data', JSON.stringify(this.local_data));
		this.myFormData.append('tags', JSON.stringify(this.tags));
		this.myFormData.append('open_hours', JSON.stringify(this.open_hours));
		this.myFormData.append('file_logo', this.logo, this.logo.name);
		this.myFormData.append('file_background', this.background, this.background.name);

		this.local_data.id_city_const_type = this.cityName.value;
		this.connection.addLocal('locals/changeLocal', this.myFormData)
						.subscribe(data => {
							console.log(data);
							this.alert.alertSuccess('Lokal został dodany').then(() => this.router.navigateByUrl('/list-restaurants'));
		});

		// console.log({id_local_data_main: this.id_local_data_main ? this.id_local_data_main : '-1',
		// local_data: JSON.stringify(this.local_data), tags: JSON.stringify(this.tags), open_hours: JSON.stringify(this.open_hours),
		//  image: this.filedata})
		// this.connection.test({id_local_data_main: this.id_local_data_main ? this.id_local_data_main : '-1',
		// local_data: JSON.stringify(this.local_data), tags: JSON.stringify(this.tags), open_hours: JSON.stringify(this.open_hours),
		//  image: this.filedata}).subscribe(data => {
		// 	console.log(data);
		// 	this.alert.alertSuccess('Lokal został dodany').then(() => this.router.navigateByUrl('/list-restaurants'));
		// });
	}
	selectDay(el, i) {
		this.selectedDayId = i;
		// this.selectedDay = true;
		// this.selectedDayId = el > 0 ? el - 1 : el;
	}
	selectMainTags(value) {
		console.log(value, value[value.length - 1]);
		// console.log(this.selectedMainTags.length)
		if (value[value.length - 1]) {
			if ((this.selectedMainTags.length - 1) < 3) {
				// console.log('dodalem')
				this.tags.push({
					id: value[value.length - 1].id,
					priority_status: true
				});
				this.tagList = this.tagList.filter( tag => {
					if (tag.id === value[value.length - 1].id) {
						this.usedTags.push(value[value.length - 1]);

						console.log(this.tags);
					}
					return tag.id !== value[value.length - 1].id;

				});
				// if (this.tags.length >= 3) {
				// 	this.tagList.map(
				// 		tag => {
				// 			return tag.disabled = !tag.disabled;
				// 		}
				// 	)
				// }
			}
		}
	}

	selectSecondaryTags(value) {

		if (value[value.length - 1]) {
			this.tagList = this.tagList.filter( tag => tag.id !== value[value.length - 1].id);
			this.tags.push({
				id: value[value.length - 1].id,
				priority_status: false
			});
		}
	}
	remove(value) {
		// console.log(value)
		this.tagList.unshift(value.value);
	}

	uploadLogo(e) {

		this.logo = <File>e.target.files[0];
		console.log(this.logo);
	}
	uploadBackground(e) {
		this.background = <File>e.target.files[0];
		console.log(this.background);
	}
}
