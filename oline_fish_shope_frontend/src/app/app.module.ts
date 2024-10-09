import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './authentication/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';


// Import Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminListProductComponent } from './admin/admin-list-product/admin-list-product.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { DepartmentComponent } from './home/department/department.component';
import { StockStatusComponent } from './home/stock-status/stock-status.component';
import { RatingComponent } from './home/rating/rating.component';
import { SalaryRangeComponent } from './home/salary-range/salary-range.component';
import { OriginCountryComponent } from './home/origin-country/origin-country.component';
import { HomeSidenavComponent } from './home/home-sidenav/home-sidenav.component';
import { CategorySidebarComponent } from './home/category-sidebar/category-sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminListProductComponent,
    SideNavComponent,
    CategorySidebarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AddProductComponent,
    ListProductComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    AdminListProductComponent,
    WelcomePageComponent,
    OrderManagementComponent,
    ProductDetailsComponent,
    DepartmentComponent,
    StockStatusComponent,
    RatingComponent,
    SalaryRangeComponent,
    OriginCountryComponent,
    HomeSidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    CheckboxModule,
    SliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
