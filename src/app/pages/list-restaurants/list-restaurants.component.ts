import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent implements OnInit {
  public items: any = [
  {id: 1, name: "PIZZA HUT" },
  {id: 2, name: "ZDROWA KROWA" },
  {id: 3, name: "PUB OSTRÓWEK" },
  {id: 4, name: "SHANTI" },
  {id: 5, name: "TULSI" },
  {id: 6, name: "KOFEINA 2.0x" },
  {id: 7, name: "SMAKOBAO" },
  {id: 8, name: "SAN ESCOBAR" },
  {id: 9, name: "TYLKO PIZZA" },
  {id: 10, name: "FRYTKARNIA" },
  {id: 11, name: "FABUŁA" }];

  constructor(public alert: AlertService) { }

  onDeleteClick(id){
    this.alert.alertQuestion('Czy napewno chcesz usunąć lokal?');
    console.log(id); 
  }
  ngOnInit() {
  }

}
