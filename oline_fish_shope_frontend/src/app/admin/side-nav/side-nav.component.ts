import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private router: Router) {}

  navigateToAddProduct(): void {
    this.router.navigate(['/admin-dashboard/add-product']);
  }

  navigateToListProduct(): void {
    this.router.navigate(['/admin-dashboard/list-product']);
  }
}
