import { Component } from '@angular/core';
import type { OrderList } from '../../models';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent {
  orders!:OrderList[];


  constructor(){}
}
