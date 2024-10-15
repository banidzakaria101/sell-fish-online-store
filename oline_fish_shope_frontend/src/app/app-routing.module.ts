import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { authGuard } from './guards/auth.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AdminListProductComponent } from './admin/admin-list-product/admin-list-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductDetailsComponent },
  { path : '',component : HomePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: WelcomePageComponent },
  { path: 'user-dashboard', component: UserDashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },

  {
    path: 'admin-dashboard',
    component: BoardAdminComponent,
    canActivate: [authGuard],
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'admin-list-product', component: AdminListProductComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: 'users', component: UserManagementComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
