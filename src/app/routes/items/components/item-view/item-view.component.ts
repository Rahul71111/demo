import { itemList } from './../../entities/index';
import { Component, OnInit, Inject } from '@angular/core';
import { ItemsFacadeService } from '../../items-facade.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {

  constructor(private facde:ItemsFacadeService) { }
  public viewData:any = {};
  itemTypes:any= {SELLABLE:'Sellable',PACKAGING_MATERIAL:'Packaging Material',RAW_MATERIAL:'Raw Material'};
  displayedColumns: string[] = ['price', 'qty', 'unit' ,'is_customer_show'];
  dataSource = [];

  ngOnInit(): void {
    this.facde.getItemViewData().pipe(take(1)).subscribe(row => {
      this.viewData = row;
      this.dataSource = this.viewData.all_item_units;
    })
  }

}
