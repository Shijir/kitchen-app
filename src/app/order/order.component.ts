import { Component, Input } from '@angular/core';
import { OrderType } from '../order.service';

@Component({
  selector: 'order-item',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  public customer: string;
  public destination: string;
  public eventName: string;
  public id: string;
  public item: string;
  public price: number;
  public sentAt: number;

  @Input("orderData") set orderData(value: OrderType) {
    this.customer = value.customer;
    this.destination = value.destination;
    this.eventName = value.event_name;
    this.id = value.id;
    this.item = value.item;
    this.price = value.price
    this.sentAt = value.sent_at_second;
  }

}
