// product-search.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.search.emit(searchTerm);
    });
  }

  onSearchChange(event: any): void {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }
}
