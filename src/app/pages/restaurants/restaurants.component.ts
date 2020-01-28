import { Component, OnInit, ViewChild, QueryList, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Restaurant } from '../../model/restaurant';
import { AlertService } from 'src/app/core/services/alert.service';
import {NgForm} from '@angular/forms';
import { map } from 'rxjs/operators';

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
	menu: File;
	imgMap: File;
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
	mainTags = [];

	secondaryTags = [];

	open_hours_template = [
		{
			id_week_day: 1,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 2,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 3,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 4,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 5,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 6,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		},
		{
			id_week_day: 0,
			kitchen_hour_from: null,
			kitchen_hour_to: null,
			local_hour_from: null,
			local_hour_to: null,
			delivery_hour_from: null,
			delivery_hour_to: null,
		}
	];
	open_hours = this.open_hours_template;
	selectedDay = false;
	selectedDayId = 0;
	// delivery = false;
	// eatInLocal = false;
	// pickUpLocal = false;
	tags = [];
	selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

	selectedMainTags = [];
	disabledMainTags = false;
	selectedSecondaryTags;
	disabledSecondaryTags = false;

	// staticEditCoupon: [];
	cities;


	// local_data object
	local_data = {
		name: '',
		address: '',
		id_city_const_type: 1,
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
		delivery_range: 0,
		latitude: 0,
		longitude: 0
	};

	id_local_data_main = -1;

	tagList;
	tagListBase;
	usedTags = [];
	myFormData = new FormData();
	uploadedLogo;
	uploadedBackground;
	uploadedMenu;
	fileMap;
	dayName = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
	loadingPage = true;
	myDisabledCondition: boolean;
	config = {
		displayKey: 'name',
		search: true,
		height: '300px',
		placeholder: 'Wybierz tag główny',
		customComparator: () => {},
		limitTo: 0,
		moreText: 'więcej',
		noResultsFound: 'Nic nie znaleziono!',
		searchPlaceholder: 'Szukaj',
		searchOnKey: 'name',
		clearOnSelection: true,
	};
	config2 = {
		displayKey: 'name',
		search: true,
		height: '300px',
		placeholder: 'Wybierz tag dodatkowy',
		customComparator: () => {},
		limitTo: 0,
		moreText: 'więcej',
		noResultsFound: 'Nic nie znaleziono!',
		searchPlaceholder: 'Szukaj',
		searchOnKey: 'name',
		clearOnSelection: true,
	};

	images = [];
	selectedFiles = [];
	myFiles = [];
	constructor(private router: Router, private route: ActivatedRoute, public connection: ConnectionService, public alert: AlertService) {
		this.connection.selectItem('CityConstType').subscribe(data => {
			this.cities = data;
			// console.log(this.cities);
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

			// for (const key in data) {
			// 	if (data.hasOwnProperty(key)) {
			// 		data[key].disabled = false;
			// 	}
			// }
			this.tagList = data;
			this.tagListBase = this.tagList;

			this.loadingPage = false;
			if (this.id_local_data_main > 0) {
				this.getData(this.id_local_data_main);
			}
		});
	}
	getData(id) {
		this.connection.getDataByGet('/locals/getDetailsEdit/' + id).subscribe((data: Restaurant) => {
			// this.items = data;
			console.log(data);
			this.local_data = {
				name: data.name ,
				address: data.address,
				id_city_const_type: data.id_city_const_type,
				phone_number: data.phone_number,
				description: data.description,
				other_info: data.other_info,
				facebook_url: data.facebook_url,
				instagram_url: data.instagram_url,
				delivery: data.delivery,
				eat_in_local: data.eat_in_local,
				pick_up_local: data.pick_up_local,
				cash_payment: data.cash_payment,
				creditcards_payment: data.creditcards_payment ? data.creditcards_payment : false ,
				contactless_payment: data.contactless_payment ? data.contactless_payment : false,
				blik_payment: data.blik_payment ? data.blik_payment : false,
				delivery_range: data.delivery_range ? data.delivery_range : 0,
				latitude: data.latitude,
				longitude: data.longitude,
			};
			if (data.work_hours.length > 0) {
				// this.open_hours = data.work_hours;
				// const open_hours_template = this.open_hours_template.filter( (element, index) => {
				// 	if( element.kitchen_hour_from || element.kitchen_hour_to || element.local_hour_from
				// 		|| element.local_hour_to || element.delivery_hour_from || element.delivery_hour_to) {
				// 		return element;
				// 	}
				// });
				// const open_hours = this.data.work_hours.map( (hours, index) => {
				// 	open_hours_template.map( hoursTemplate => {
				// 		if (hours.id_week_day === hoursTemplate.id_week_day) {
				// 			this.open_hours[index] = hoursTemplate;
				// 		}
				// 	});
				// });
				this.open_hours_template.map( (hoursTemplate, hoursTemplateIndex) => {
					// console.log(hoursTemplateIndex);
					data.work_hours.map( (hours, index) => {
						// console.log(hours);
						if (hours) {
							if (hoursTemplate['id_week_day'] === hours['id_week_day']) {
								console.log(this.open_hours_template[hoursTemplateIndex], hours);
								this.open_hours_template[hoursTemplateIndex] = hours;
							}
						}
					});
				});
				// console.log(this.open_hours_template);
			}
			console.log('main_tags' + data.main_tags);
			console.log('secondary_tags' + data.secondary_tags);
			const main_tags = [];
			const newDataMainTags = Object.values(data.main_tags);

			for (let i = 0; i < newDataMainTags.length; i++) {
				main_tags.push(newDataMainTags[i]);
				this.selectedMainTags = main_tags;
				console.log( this.selectedMainTags.length);
				// // // console.log(data.main_tags[i])
				this.mainTags.push({
					id: newDataMainTags[i].id,
					priority_status: true
				});
				this.tagList = this.tagList.filter( tag => {
					// if (tag.id === newDataMainTags[i].id) {
					// 	this.usedTags.push(tag);
					// }
					return tag.id !== newDataMainTags[i].id;

				});
			}
			const secondary_tags = [];
			const newDataSecondaryTags = Object.values(data.secondary_tags);

			for (let i = 0; i < newDataSecondaryTags.length; i++) {
				secondary_tags.push(newDataSecondaryTags[i]);
				this.selectedSecondaryTags = secondary_tags;
				this.secondaryTags.push({
					id: newDataSecondaryTags[i].id,
					priority_status: false
				});
				this.tagList = this.tagList.filter( tag => {
					// if (tag.id === newDataSecondaryTags[i].id) {
					// 	this.usedTags.push(tag);
					// }
					return tag.id !== newDataSecondaryTags[i].id;

				});
				// console.log(this.usedTags)
			}
		});
	}

	click() {

	}

	sendData() {
		console.log('wqysylam')
		if (this.open_hours.length > 0) {
			const open_hours_template = this.open_hours_template.filter( (element, index) => {
				if ( element.kitchen_hour_from || element.kitchen_hour_to || element.local_hour_from
					|| element.local_hour_to || element.delivery_hour_from || element.delivery_hour_to) {
					return element;
				}
			});
			const open_hours = this.open_hours.map( (hours, hoursIndex) => {
				open_hours_template.map( hoursTemplate => {
					if (hours.id_week_day === hoursTemplate.id_week_day) {
						this.open_hours[hoursIndex] = hoursTemplate;
					}
				});
			});
		} else {
			this.open_hours = this.open_hours_template;
			// console.log(this.open_hours);
		}
		// // console.log(this.filedata.name)
		// // console.log({
		// 	id_local_data_main: this.id_local_data_main ? this.id_local_data_main : '-1', image: this.filedata
		// });
		// // console.log({id_local_data_main: this.id_local_data_main ? this.id_local_data_main : '-1',
		// local_data: JSON.stringify(this.local_data), tags: JSON.stringify(this.tags), open_hours: JSON.stringify(this.open_hours),
		//  image: this.myFormData});
		this.tags = [...this.mainTags, ...this.secondaryTags];
		console.log(this.tags);
		// this.local_data.id_city_const_type = this.cityName.value;
		this.myFormData.append('id_local_data_main', this.id_local_data_main.toString());
		this.myFormData.append('local_data', JSON.stringify(this.local_data));
		this.myFormData.append('tags', JSON.stringify(this.tags));
		this.myFormData.append('open_hours', JSON.stringify(this.open_hours));
		if (this.logo) {
			this.myFormData.append('file_logo', this.logo, this.logo.name);
		}
		if (this.background) {
			this.myFormData.append('file_background', this.background, this.background.name);
		}
		if (this.myFiles) {
			for ( let i = 0; i < this.myFiles.length; i++) {
				this.myFormData.append('file_menu[]', this.myFiles[i], this.myFiles[i].name);
			}
		}

		if (this.imgMap) {
			this.myFormData.append('file_map', this.imgMap, this.imgMap.name);
		}

		// // console.log(this.cityName.value)
		this.connection.addLocal('locals/changeLocal', this.myFormData)

						.subscribe(data => {
							// console.log(data);
							this.alert.alertSuccess('Lokal został dodany').then(() => this.router.navigateByUrl('/list-restaurants'));
		});
	}
	selectDay(i) {
		this.selectedDayId = i;
	}

	selectMainTags(value) {
		if ( value.value ) {
			if ( value.value.length <= 3) {
				console.log('Dodaje');
				this.mainTags = [];
				value.value.map ( tag => {
					this.mainTags.push({
						id: tag.id,
						priority_status: true
					});
				});
				// console.log(value.value)
				this.tagList.filter( tag => {
					if (value.value[value.value.length - 1]) {
						return tag.id !== value.value[value.value.length - 1].id;
					}

				});
			} else {
				this.tagList = [...this.tagList, value.value[0]];
				value.value.shift();
			}
		}
		console.log(this.mainTags);
	}

	selectSecondaryTags(value) {
		console.log(value.value);
			if (value.value) {
				// if ( value.value[value.value.length - 1] ) {
					// this.tags.push({
					// 	id: value.value[value.value.length - 1].id,
					// 	priority_status: false
					// });
					// this.tagList = this.tagList.filter( tag => {
					// 	return tag.id !== value.value[value.value.length - 1].id;
					// });
					console.log('Dodaje');
					this.secondaryTags = [];
					value.value.map ( tag => {
						this.secondaryTags.push({
							id: tag.id,
							priority_status: false
						});
					});
					// this.tagList.filter( tag => {
					// 	if (value.value[value.value.length - 1]) {
					// 		return tag.id !== value.value[value.value.length - 1].id;
					// 	}
					// });
				// }
			}
	}

	uploadLogo(e) {

		this.logo = <File>e.target.files[0];
		// console.log(this.logo);
	}
	uploadBackground(e) {
		this.background = <File>e.target.files[0];
		// this.images.push(this.background);
		// console.log(e.target);
		// console.log(this.images);
	}
	uploadMenu(e) {
		if (e.target.files.length < 20) {
			for (let i = 0; i < e.target.files.length; i++) {
				this.myFiles.push(e.target.files[i]);
			}
		} else {
			this.alert.alertError('Za dużo zdjęć')
		}
		console.log(this.myFiles)
	}

	uploadFileMap(e) {
		this.imgMap = <File>e.target.files[0];
	}
	deleteMenuImage(file) {
		// console.log(file);
		this.myFiles = this.myFiles.filter(
			el => {
				if (el.name !== file.name) {
					return el;
					alert('istnieje')
				}
				console.log(el.name, '/', file.name);
			}
		);
		console.log(this.myFiles)
	}
}
