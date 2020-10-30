import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { OrdersService, OrderType } from './order.service';
import { SearchService } from './search.service';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private orderServiceSub: Subscription;
  private searchServiceSub: Subscription;

  orders: { [key: string]: OrderType } = {};

  numberOfMatches: number;

  priceFilter: number;

  constructor(private ordersService: OrdersService, private searchService: SearchService) {}

  ngOnInit() {
    this.orderServiceSub = this.ordersService.connect().subscribe((ordersData: OrderType[]) => {  
      if(ordersData.length) {
        ordersData.forEach((od: OrderType) => {
          this.orders[od.id] = {...od, price: this.centToDollar(od.price)};
        }); 
      }
    });

    // As we will do real-time search while polling data,
    // debouncing could help us to resolve re-populating data lagging.
    this.searchServiceSub = this.searchService.filterRequest
    .pipe(debounce(() => interval(200)))
    .subscribe((priceFilter: number) => { this.priceFilter = priceFilter });
  }

  centToDollar(cents: number): number {
    return cents/100;
  }

  getOrderList(orders: { [key: string]: OrderType }) {
    const list = Object.values(orders).reverse().filter((o: OrderType) => !this.priceFilter || o.price === this.priceFilter);
    this.numberOfMatches = list.length;

    return list;
  }

  trackByFn(index: number, item: OrderType) {
    return item.id
  }

  ngOnDestroy () {
    this.orderServiceSub.unsubscribe();
    this.searchServiceSub.unsubscribe();
  }
}
