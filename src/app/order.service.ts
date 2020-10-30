import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as socketIo from 'socket.io-client';

export interface OrderType {
    customer: string;
    destination: string;
    event_name: string;
    id: string;
    item: string;
    price: number;
    sent_at_second: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _orderStream: Subject<OrderType[]> = new Subject<OrderType[]>();

  connect(): Observable<OrderType[]> {
    const socket = socketIo('http://localhost:4000');

    socket.on('order_event', (res) => {
      this._orderStream.next(res);
    });

    return this._orderStream.asObservable();
  }
}