import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';

@Component({
	selector: 'app-list-coupons',
	templateUrl: './list-coupons.component.html',
	styleUrls: ['./list-coupons.component.scss']
})
export class ListCouponsComponent implements OnInit {
	public items: any = [];

	constructor(public alert: AlertService, public router: Router, public connection: ConnectionService) {}
	ngOnInit() {
		this.connection.getDataByGet('/coupons/getSupportCouponsByCity/1').subscribe(data => {
			this.items = data;
			console.log(data);
		});
	}
	onDeleteClick(id) {
		this.alert.alertQuestion('Czy napewno chcesz usunąć kupon?').then(callback => {
			if (callback === true) {
				this.connection.getDataByPost('/coupons/removeCoupon', { id_coupon_data_main: id }).subscribe(data => {
					console.log(data);
					this.router.navigateByUrl('list-coupons');
				});
			}
		});
	}

	onEditClick(id) {
		this.router.navigateByUrl('edit-coupon/' + id);
	}
}
