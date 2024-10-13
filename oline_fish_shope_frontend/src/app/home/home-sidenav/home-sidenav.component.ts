import { Component } from '@angular/core';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.css']
})
export class HomeSidenavComponent {
  selectedDepartmentId: number | null = null;

  clearAllFilters() {
    this.selectedDepartmentId = null;
  }

  onDepartmentSelected(departmentId: number): void {
    this.selectedDepartmentId = departmentId;
    console.log('Selected Department ID in HomeSidenav:', this.selectedDepartmentId); 

  }
}
