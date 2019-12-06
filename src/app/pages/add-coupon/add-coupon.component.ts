import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
export interface Coupon {
	couponTitle: string;
	couponText: string;
	mainTags: string;
	secondaryTags: string;
	count: number;
}
@Component({
	selector: 'app-add-coupon',
	templateUrl: './add-coupon.component.html',
	styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
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



	staticEditCoupon: Coupon;

	constructor(private route: ActivatedRoute) {
		this.route.params
		.subscribe(
			(params) => {
				// console.log(params);
				if (params.id) {

				}
			}
		);
	}

	ngOnInit() {
	}
	sendData() {
		const coupon = {
			title: this.couponTitle,
			description: this.couponText,
			tags_primary : this.mainTags,
			tags_secondary: this.secondaryTags,
			count: this.count,
			mainTags: this.mainTags,
			secondaryTags: this.secondaryTags
		};
		console.log(this.secondaryTags);
	}
	onAdd(e) {
		e.map( o => {
			console.log(o);
		});
	}
}

interface AutoCompleteModel {
	value: number;
	display: string;
 }