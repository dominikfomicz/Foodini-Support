import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
export interface Coupon {
	couponTitle: string;
	couponText: string;
	mainTags: {};
	secondaryTags: {};
	count: number;
}
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
		mature: false,
	};

	locals;
	selectedLocal;

	constructor(private route: ActivatedRoute,  public connection: ConnectionService) {
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
		console.log({id_local_data_main: this.selectedLocal, coupon_data: this.coupon_data, tags: this.tags});
		// console.log(this.tags);
		this.connection.getDataByPost('/coupons/changeCoupon',
						{id_local_data_main: this.selectedLocal, coupon_data: JSON.stringify(this.coupon_data), tags: this.tags})
						.subscribe(data => {
			console.log(data);
		});
	}
	onAdd(e) {
		e.map( o => {
			console.log(o);
		});
	}
	selectMainTags(value) {
		console.log(value);
		if (this.selectedMainTags.length < 3) {
			this.tags.push({
				id: value[0].value,
				priority_status: true
			});
		}
	}

	selectSecondaryTags(value) {
		console.log(value[0].value);
		this.tags.push({
			id: value[0].value,
			priority_status: false
		});
	}
}
