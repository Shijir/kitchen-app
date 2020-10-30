import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _filterReqeust: Subject<number> = new Subject<number>();

  requestFilter(price: number) {
    this._filterReqeust.next(price);
  }

  get filterRequest(): Observable<number> {
    return this._filterReqeust.asObservable();
  }
}
