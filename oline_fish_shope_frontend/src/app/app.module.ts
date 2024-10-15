import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
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
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';




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
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserBasketComponent } from './user-dashboard/user-basket/user-basket.component';
import { UserFavoritesComponent } from './user-dashboard/user-favorites/user-favorites.component';
import { UserOrdersComponent } from './user-dashboard/user-orders/user-orders.component';
import { NavigationComponent } from './user-dashboard/navigation/navigation.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserNavbarComponent } from './user-dashboard/user-navbar/user-navbar.component';
import { SidNavComponent } from './home/sid-nav/sid-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AdminListProductComponent,
    SideNavComponent,
    CategorySidebarComponent,
    LoginComponent,
    ProfileComponent,
    BoardAdminComponent,
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
    ProductSearchComponent,
    UserDashboardComponent,
    UserManagementComponent,
    UserBasketComponent,
    UserFavoritesComponent,
    UserOrdersComponent,
    NavigationComponent,
    AboutUsComponent,
    ContactUsComponent,
    UserNavbarComponent,
    SidNavComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    InputTextModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    CheckboxModule,
    SliderModule,
    FloatLabelModule,
    ChipsModule,
    ButtonModule,
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
    TableModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbModule,
    ButtonModule,
    ImageModule,
    InputNumberModule,
    MessageModule,
    TagModule,
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
