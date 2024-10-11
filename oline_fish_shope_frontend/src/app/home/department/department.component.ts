import { Component } from '@angular/core';
import { Department } from '../../enums/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  departments = Object.values(Department);
  selectedDepartments: string[] = [];
  isExpanded: boolean = false;

  toggleDepartments() {
    this.isExpanded = !this.isExpanded;
}

}
