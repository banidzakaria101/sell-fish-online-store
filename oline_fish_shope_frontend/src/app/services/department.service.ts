// src/app/services/department.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8088/api/departments';

  constructor(private http: HttpClient) {}

  createDepartment(departmentDTO: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, departmentDTO);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoriesByDepartmentId(departmentId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/${departmentId}/categories`);
  }
}
