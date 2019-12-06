import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-coupon',
	templateUrl: './add-coupon.component.html',
	styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
	coupon = [];
	couponTitle: string;
	couponText: string;
	mainTags: string;
	secondaryTags: string;
	count: number;
	constructor() { }

	ngOnInit() {
	}
	sendData() {
		const coupon = {
			title: this.couponTitle,
			description: this.couponText,
			tags_primary : this.mainTags,
			tags_secondary: this.secondaryTags,
			count: this.count,
		};
		console.log(coupon);
	}
}
