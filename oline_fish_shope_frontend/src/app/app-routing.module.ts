import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Define route for login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin-dashboard',
    component:BoardAdminComponent,
    canActivate: [authGuard], // Protect route with AuthGuard
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'list-product', component: ListProductComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }  // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
