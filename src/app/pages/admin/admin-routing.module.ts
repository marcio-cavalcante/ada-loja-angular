import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'user-manager', pathMatch: 'full' },
      { path: 'user-manager', component: UserManagerComponent },
      { path: 'product-manager', component: ProductManagerComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
