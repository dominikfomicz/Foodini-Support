import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Coupon } from '../../model/coupons';
import { Tags } from 'src/app/model/restaurant';

@Component({
	selector: 'app-coupons',
	templateUrl: './coupons.component.html',
	styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
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

	tags = [];
	selectedMainTags;
	disabledMainTags = false;
	selectedSecondaryTags;
	disabledSecondaryTags = false;

	staticEditCoupon: Coupon;

	coupon_data = {
		amount: 0,
		delivery: false,
		description:  '',
		eat_in_local:  false,
		mature:  false,
		name:  '',
		pick_up_local:  false,
	};

	locals;
	selectedLocal;
	id_coupon_data_main = '-1';
	tagList;
	usedTags = [];
	logo: File;
	myFormData = new FormData();
	uploadedLogo;
	uploadedBackground;

	open_hours = [
		{
			id_week_day: 1,
			hour_from: null,
			hour_to: null
		},
		{
			id_week_day: 2,
			hour_from: null,
			hour_to: null
		},
		{
			id_week_day: 3,
			hour_from: null,
			hour_to: null
		},
		{
			id_week_day: 4,
			hour_from: null,
			hour_to: null
		},
		{
			id_week_day: 5,
			hour_from: null,
			hour_to: null
		},
		{
			id_week_day: 6,
			hour_from: null,
			hour_to: null
		},
		{
			id_week_day: 0,
			hour_from: null,
			hour_to: null
		}
	];
	selectedDayId = 0;
	dayName = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
	couponTags;
	loadingPage = true;
	config = {
		displayKey: 'name',
		search: true, // true/false for the search functionlity defaults to false,
		height: '300px', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
		placeholder: 'Wybierz tag główny', // text to be displayed when no item is selected defaults to Select,
		customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
		limitTo: 0, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
		moreText: 'więcej', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
		noResultsFound: 'Nic nie znaleziono!', // text to be displayed when no items are found while searching
		searchPlaceholder: 'Szukaj', // label thats displayed in search input,
		searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
		clearOnSelection: true, // clears search criteria when an option is selected if set to true, default is false
	};
	config2 = {
		displayKey: 'name',
		search: true, // true/false for the search functionlity defaults to false,
		height: '300px', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
		placeholder: 'Wybierz tag dodatkowy', // text to be displayed when no item is selected defaults to Select,
		customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
		limitTo: 0, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
		moreText: 'więcej', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
		noResultsFound: 'Nic nie znaleziono!', // text to be displayed when no items are found while searching
		searchPlaceholder: 'Szukaj', // label thats displayed in search input,
		searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
		clearOnSelection: true, // clears search criteria when an option is selected if set to true, default is false
	};
	constructor(private router: Router, private route: ActivatedRoute,  public connection: ConnectionService, public alert: AlertService) {

		this.route.params.subscribe(
			(params) => {
				if (params.id) {
					this.id_coupon_data_main = params.id;
					// this.selectedLocal = this
					this.getData(this.id_coupon_data_main);
				}
			}
		);
		// this.route.params
		// .subscribe(
		// 	(params) => {
		// 		// console.log(params);
		// 		if (params.id) {
		// 			this.couponTitle = 'Tytul kuponu';
		// 			this.couponText = 'Text kuponu';
		// 			this.count = 100;

		// 			this.staticEditCoupon = {
		// 				couponTitle: 'Tytul kuponu',
		// 				couponText: 'Text kuponu',
		// 				mainTags: [{
		// 					value: 0, name: 'Pizza'
		// 				}, {
		// 					value: 1, name: 'Pasta'
		// 				}, {
		// 					value: 2, name: 'Parmesan'
		// 				}],
		// 				secondaryTags: [{
		// 					value: 0, name: 'Napoje'
		// 				}, {
		// 					value: 1, name: 'Soki'
		// 				}, {
		// 					value: 2, name: 'Wigilie'
		// 				}],
		// 				count: 100
		// 			};
		// 		} else {
		// 			this.staticEditCoupon = {
		// 				couponTitle: '',
		// 				couponText: '',
		// 				mainTags: [],
		// 				secondaryTags: [],
		// 				count: 0
		// 			};
		// 		}
		// 	}
		// );
	}

	ngOnInit() {
		this.getlocals();

	}
	getlocals() {
		this.connection.getDataByPost('tools/getList',
						{app_list_string: 'LocalDataMain'})
						.subscribe(locals => {
							this.locals = locals;
							this.connection.getDataByGet('/tags/getList').subscribe((data: Tags) => {
								this.tagList = data;
								console.log(data);
								console.log(this.tags);
								const main_tags = [];
								const secondary_tags = [];
								for (let i = 0; i < this.couponTags.length; i++) {
									if (this.couponTags[i].is_main) {
										main_tags.push(this.couponTags[i]);
										this.selectedMainTags = main_tags;

										console.log(this.tagList);
										this.tags.push({
											id: this.couponTags[i].id,
											priority_status: this.couponTags[i].is_main
										});
										this.tagList = this.tagList.filter( tag => {
											// if (tag.id === newDataMainTags[i].id) {
											// 	this.usedTags.push(tag);
											// }
											return tag.id !== this.couponTags[i].id;

										});
									} else {
										secondary_tags.push(this.couponTags[i]);
										this.selectedSecondaryTags = secondary_tags;
										// // // console.log(data.main_tags[i])
										this.tags.push({
											id: this.couponTags[i].id,
											priority_status: this.couponTags[i].is_main
										});
										this.tagList = this.tagList.filter( tag => {
											// if (tag.id === newDataSecondaryTags[i].id) {
											// 	this.usedTags.push(tag);
											// }
											return tag.id !== this.couponTags[i].id;

										});
									}
								}
							});
							this.loadingPage = false;
		});
	}
	sendData() {
		// const coupon = {
		// 	title: this.couponTitle,
		// 	description: this.couponText,
		// 	tags_primary : this.mainTags,
		// 	tags_secondary: this.secondaryTags,
		// 	count: this.count,
		// 	mainTags: this.mainTags,
		// 	secondaryTags: this.secondaryTags
		// };
		// console.log({id_coupon_data_main:  this.id_coupon_data_main ? this.id_coupon_data_main : '-1', id_local_data_main: this.selectedLocal,
		// coupon_data: JSON.stringify(this.coupon_data), tags: JSON.stringify(this.tags)});
		// console.log(this.tags);
		// console.log({id_coupon_data_main: this.id_coupon_data_main, id_local_data_main: this.selectedLocal,
		// 	coupon_data: this.coupon_data, tags: this.tags});
		console.log(this.tags);
		this.myFormData.append('id_coupon_data_main', this.id_coupon_data_main);
		this.myFormData.append('id_local_data_main', this.selectedLocal);
		this.myFormData.append('coupon_data', JSON.stringify(this.coupon_data));
		this.myFormData.append('tags', JSON.stringify(this.tags));
		if (this.logo) {
			this.myFormData.append('file_logo', this.logo, this.logo.name);
		}
		this.myFormData.append('open_hours', JSON.stringify(this.open_hours));


		this.connection.addLocal('/coupons/changeCoupon', this.myFormData)
						.subscribe(data => {
							console.log(data);
							this.alert.alertSuccess('Kupon został dodany').then(() => this.router.navigateByUrl('/list-coupons'));
		});
	}
	onAdd(e) {
		e.map( o => {
			console.log(o);
		});
	}
	// selectMainTags(value) {
	// 	// const tags = Object.values(this.selectedMainTags);
	// 	// // console.log(value, value[value.length - 1]);
	// 	// if (tags.length > 0 ) {
	// 	// 	this.tags = tags;
	// 	// }
	// 	if (value[value.length - 1]) {
	// 		if ((this.selectedMainTags.length - 1) < 3) {
	// 			// console.log('dodalem')
	// 			this.tags.push({
	// 				id: value[value.length - 1].id,
	// 				priority_status: true
	// 			});
	// 			this.tagList = this.tagList.filter( tag => {
	// 				if (tag.id === value[value.length - 1].id) {
	// 					this.usedTags.push(value[value.length - 1]);

	// 					console.log(this.tags);
	// 				}
	// 				return tag.id !== value[value.length - 1].id;

	// 			});
	// 			// if (this.tags.length >= 3) {
	// 			// 	this.tagList.map(
	// 			// 		tag => {
	// 			// 			return tag.disabled = !tag.disabled;
	// 			// 		}
	// 			// 	)
	// 			// }
	// 		} else {
	// 			console.log(value);
	// 			value.map( element => {
	// 				console.log(element.id);
	// 				this.tags.push({
	// 					id: element.id,
	// 					priority_status: true
	// 				});
	// 			});
	// 		}
	// 	}
	// }
	selectMainTags(value) {
		// if ( value.length <= 3 && value.length > 0) {
		// 	this.tags.push({
		// 		id: value[value.length - 1].id,
		// 		priority_status: true
		// 	});

		// 	this.tagList = this.tagList.filter( tag => {

		// 		return tag.id !== value[value.length - 1].id;

		// 	});
		// }
		if ( value.value ) {
			if ( value.value.length <= 3) {
				console.log('Dodaje');
				this.tags = [];
				value.value.map ( tag => {
					this.tags.push({
						id: tag.id,
						priority_status: true
					});
				});
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
		console.log(this.tags);
	}

	selectSecondaryTags(value) {
		// // if (this.selectedSecondaryTags.length > 3) {
		// 	// console.log(this.selectedSecondaryTags);
		// 	// this.selectedSecondaryTags.filter(tag => {
		// 	// 	this.tags.push({
		// 	// 		id: tag,
		// 	// 		priority_status: false
		// 	// 	});
		// 	// });
		// // } else {
		// 	if ( value[value.length - 1] ) {
		// 		this.tags.push({
		// 			id: value[value.length - 1].id,
		// 			priority_status: false
		// 		});

		// 		this.tagList = this.tagList.filter( tag => {

		// 			return tag.id !== value[value.length - 1].id;

		// 		});
		// 	}

		// // }
		// // console.log(this.selectedMainTags);
		console.log(value.value)
			if (value.value) {
				if ( value.value[value.value.length - 1] ) {
					// this.tags.push({
					// 	id: value.value[value.value.length - 1].id,
					// 	priority_status: false
					// });
					// this.tagList = this.tagList.filter( tag => {
					// 	return tag.id !== value.value[value.value.length - 1].id;
					// });
					console.log('Dodaje');
					this.tags = [];
					value.value.map ( tag => {
						this.tags.push({
							id: tag.id,
							priority_status: false
						});
					});
					// this.tagList.filter( tag => {

					// 	if (value.value[value.value.length - 1]) {
					// 		return tag.id !== value.value[value.value.length - 1].id;
					// 	}
					// });
				}
			}
	}

	// selectSecondaryTags(value) {
	// 	// const tags = Object.values(this.selectedSecondaryTags);
	// 	// console.log(tags);
	// 	// if (tags.length > 0 ) {
	// 	// 	tags.map( tag => {
	// 	// 		console.log(tag);
	// 	// 		// this.tags.push(tag.id);
	// 	// 	});
	// 	// }
	// 	if (value[value.length - 1]) {
	// 		this.tagList = this.tagList.filter( tag => tag.id !== value[value.length - 1].id);
	// 		this.tags.push({
	// 			id: value[value.length - 1].id,
	// 			priority_status: false
	// 		});
	// 	}
	// }
	remove(value) {
		// console.log(value);
		this.tags = this.tags.filter(tag => {
			// return tag.id !== value.value.
			// console.log(tag);
			if (tag.id !== value.value.id) {
				return tag.id;
			}
			// return tag.id !== value.value.id;
		});
		// console.log(this.tags)
	}
	uploadLogo(e) {

		this.logo = <File>e.target.files[0];
		console.log(this.logo);
	}
	selectDay(el, i) {
		console.log(i);
		this.selectedDayId = i;
		// this.selectedDay = true;
		// this.selectedDayId = el > 0 ? el - 1 : el;
	}

	getData(id) {
		this.connection.getDataByGet('/coupons/getDetailsEdit/' + id).subscribe((data: Coupon) => {
			console.log(data);
			// this.items = data;
			// console.log(data);
			this.coupon_data = {
				amount: data.amount,
				delivery: data.delivery,
				description:  data.description,
				eat_in_local:  data.eat_in_local,
				mature:  data.mature,
				name:  data.name,
				pick_up_local:  data.pick_up_local,
			};
			// this.coupon_data.
			this.selectedLocal = data.id_local_data_main;
			this.open_hours = data.available_hours;

			const newDataMainTags = Object.values(data.tags);
			this.couponTags = newDataMainTags;

			// // console.log(newDataMainTags)

			// const secondary_tags = [];
			// const newDataSecondaryTags = Object.values(data.secondary_tags);
			// // // console.log(newDataSecondaryTags)
			// for (let i = 0; i < newDataSecondaryTags.length; i++) {
			// 	secondary_tags.push(newDataSecondaryTags[i].id);
			// 	this.selectedSecondaryTags = secondary_tags;
			// 	// // // console.log(data.main_tags[i])
			// }
			// console.log(data);
			// const main_tags = [];
			// const newDataMainTags = Object.values(data.main_tags);
			// console.log(newDataMainTags)
			// for (let i = 0; i < newDataMainTags.length; i++) {
			// 	main_tags.push(newDataMainTags[i].id);
			// 	this.selectedMainTags = main_tags;
			// 	// console.log(data.main_tags[i])
			// }
			// const secondary_tags = [];
			// const newDataSecondaryTags = Object.values(data.secondary_tags);
			// console.log(newDataSecondaryTags)
			// for (let i = 0; i < newDataSecondaryTags.length; i++) {
			// 	secondary_tags.push(newDataSecondaryTags[i].id);
			// 	this.selectedSecondaryTags = secondary_tags;
			// 	// console.log(data.main_tags[i])
			// }
			// // console.log(data.main_tags);
			// // data.main_tags.filter( element => {
			// // 	tags.push(element.id);
			// // 	this.selectedMainTags = tags;
			// // });
			// // for (let i = 0; i < data.secondary_tags.length; i++) {
			// // 	tags.push(data.secondary_tags[i].id);
			// // 	this.selectedMainTags = tags;
			// // }
			// // data.main_tags.map( el => {
			// // 	console.log(el.id)
			// // })
			// console.log(this.selectedMainTags);
			// console.log([data.id_city_const_type].select(this.cities[data.id_city_const_type].value))
		});
	}
	// fillHour() {
	// 	let staticHourFrom;
	// 	let staticHourTo;
	// 	this.open_hours.map((couponHour, index) => {
	// 		if (couponHour.id_week_day === this.selectedDayId) {
	// 			staticHourFrom = couponHour.hour_from;
	// 			staticHourTo = couponHour.hour_to;
	// 			couponHour.hour_from = staticHourFrom;
	// 			couponHour.hour_to = staticHourTo;
	// 			console.log(couponHour);
	// 		}


	// 	});
	// }
}
