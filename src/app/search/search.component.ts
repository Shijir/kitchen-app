import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'order-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private searchService: SearchService) {}

  private _priceFilter: number;

  get priceFilter() {
    return this._priceFilter;
  }

  set priceFilter(value: number) {
    this._priceFilter = value;
    this.searchService.requestFilter(value);
  }

}
