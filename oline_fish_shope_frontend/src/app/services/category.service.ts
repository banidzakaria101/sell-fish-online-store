import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoriesByDepartment(departmentId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/departments/${departmentId}/categories`);
  }
}
