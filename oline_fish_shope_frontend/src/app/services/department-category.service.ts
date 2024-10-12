import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentCategoryService {
  private selectedDepartmentSource = new BehaviorSubject<string | null>(null);
  selectedDepartment$ = this.selectedDepartmentSource.asObservable();

  setSelectedDepartment(department: string) {
    this.selectedDepartmentSource.next(department);
  }
}
