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

const routes: Routes = [
  { path: 'product/:id', component: ProductDetailsComponent },
  {path : '',component : HomePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'admin-dashboard',
    component:BoardAdminComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomePageComponent},
      { path: 'add-product', component: AddProductComponent },
      { path: 'admin-list-product', component: AdminListProductComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
