import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Coupon } from '../../model/coupons';

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
		name: '',
		description: '',
		amount: 0,
		// mature: false,
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
	constructor(private router: Router, private route: ActivatedRoute,  public connection: ConnectionService, public alert: AlertService) {
		this.route.params.subscribe(
			(params) => {
				if (params.id) {
					this.id_coupon_data_main = params.id;
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
		this.connection.getDataByGet('/tags/getList').subscribe(data => {
			this.tagList = data;
			console.log(data);
		});
	}
	getlocals() {
		this.connection.getDataByPost('tools/getList',
						{app_list_string: 'LocalDataMain'})
						.subscribe(data => {
							this.locals = data;
			console.log(data);
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
		console.log(this.open_hours);
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
	selectMainTags(value) {
		// console.log(value, value[value.length - 1]);
		console.log(this.selectedMainTags.length)
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
					return tag.id !== value[value.length - 1].id

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
	selectDay(el, i) {
		console.log(i);
		this.selectedDayId = i;
		// this.selectedDay = true;
		// this.selectedDayId = el > 0 ? el - 1 : el;
	}

	getData(id) {
		this.connection.getDataByGet('/coupons/getDetails/' + id).subscribe((data: Coupon) => {
			console.log(data);
			// this.items = data;
			// console.log(data);
			this.coupon_data = {
				amount: data.amount,
				// available_hours: data.available_hours,
				// coupon_id: data.coupon_id,
				// delivery: data.delivery,
				description: data.description,
				// eat_in_local: data.eat_in_local,
				// favourite_count: data.favourite_count,
				// is_available: data.is_available,
				// is_favouirite: data.is_favouirite,
				name: data.name,
				// pick_up_local: data.pick_up_local,
				// tags: data.available_hours,
			};
			this.open_hours = data.available_hours;
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
}
