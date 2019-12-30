import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-tags',
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
	tagTitle: string;
	tagDescription: string;
	id_tag_data_main = -1;
	categories;
	selectedTagCategories;
	constructor(private router: Router, private route: ActivatedRoute, public connection: ConnectionService, public alert: AlertService) {
		this.route.params.subscribe(
			(params) => {
				if (params.id) {
					this.id_tag_data_main = params.id;
				}
			}
		);
	 }

	ngOnInit() {
		this.connection.selectItem('TagConstCategory').subscribe( data => {
			this.categories = data;
			console.log(data);
		})
	}
	sendData() {
		// console.log(this.selectedTagCategories, {id_tag_data_main: this.id_tag_data_main, name: this.tagTitle,
		// 	description: this.tagDescription, id_tag_const_category: this.selectedTagCategories})
		this.connection.getDataByPost('tags/changeTag',
						{id_tag_data_main: this.id_tag_data_main,
						name: this.tagTitle, description: this.tagDescription, id_tag_const_category: this.selectedTagCategories})
						.subscribe(data => {
			console.log(data);
			this.alert.alertSuccess('Tag został dodany').then(() => this.router.navigateByUrl('/list-tags'));
		});
	}
}
