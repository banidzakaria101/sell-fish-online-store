import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private departmentSource = new BehaviorSubject<number | null>(null);
  department$ = this.departmentSource.asObservable();

  selectDepartment(departmentId: number | null) {
    this.departmentSource.next(departmentId); 
  }
}
