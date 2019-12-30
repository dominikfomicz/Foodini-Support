import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-list-tags',
	templateUrl: './list-tags.component.html',
	styleUrls: ['./list-tags.component.scss']
})
export class ListTagsComponent implements OnInit {
	items;
	categories;

	constructor(public connection: ConnectionService, public router: Router, public alert: AlertService) { }

	ngOnInit() {
		this.connection.selectItem('TagConstCategory').subscribe( data => {
			this.categories = data;
			console.log(data);
			this.getTagList();
		})

	}
	getTagList() {
		this.connection.getDataByGet('/tags/getList').subscribe(data => {
			this.items = data;

			this.categories.filter( category => {
				console.log(category);
				this.items.map( item => {
					console.log(item);
					if ( item.id_tag_const_category === category.item_id ) {
						item.category_tag_name = category.item_name;
					}
				});
			});

			console.log(data);
		});
	}
	onDeleteClick(id) {
		this.alert.alertQuestion('Czy napewno chcesz usunąć tag?').then(
			callback => {
				if (callback === true) {
				// 	this.connection.getDataByPost('',).subscribe(data => {
				// 		console.log(data);
				// })
				}
			}
		);
	}

	onEditClick(id) {
		this.router.navigateByUrl('edit-tag/' + id);
	}
}
