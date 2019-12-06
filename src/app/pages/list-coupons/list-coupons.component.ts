import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-coupons',
  templateUrl: './list-coupons.component.html',
  styleUrls: ['./list-coupons.component.scss']
})
export class ListCouponsComponent implements OnInit {
  public items: any = [
		{id: 1, local_name: 'PIZZA HUT', title: 'Kupon na kurczaka' },
		{id: 2, local_name: 'ZDROWA KROWA', title: 'Kupon na kurczaka' },
		{id: 3, local_name: 'PUB OSTRÓWEK', title: 'Kupon na kurczaka' },
		{id: 4, local_name: 'SHANTI', title: 'Kupon na kurczaka' },
		{id: 5, local_name: 'TULSI', title: 'Kupon na kurczaka' },
		{id: 6, local_name: 'KOFEINA 2.0x', title: 'Kupon na kurczaka' },
		{id: 7, local_name: 'SMAKOBAO', title: 'Kupon na kurczaka' },
		{id: 8, local_name: 'SAN ESCOBAR', title: 'Kupon na kurczaka' },
		{id: 9, local_name: 'TYLKO PIZZA', title: 'Kupon na kurczaka' },
		{id: 10, local_name: 'FRYTKARNIA', title: 'Kupon na kurczaka' },
		{id: 11, local_name: 'FABUŁA', title: 'Kupon na kurczaka' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
