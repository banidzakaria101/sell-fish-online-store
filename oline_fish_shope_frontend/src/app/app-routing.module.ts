import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
