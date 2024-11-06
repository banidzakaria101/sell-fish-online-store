import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.css']
})
export class HomeSidenavComponent {
  @Output() categorySelected = new EventEmitter<number | null>();
  selectedCategoryId: number | null = null;

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }

  clearAllFilters() {
    this.selectedCategoryId = null;
    this.categorySelected.emit(null);
  }
}
