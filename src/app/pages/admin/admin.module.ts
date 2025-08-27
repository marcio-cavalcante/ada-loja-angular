import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent, 
    UserManagerComponent, 
    ProductManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminComponent
  ],
})
export class AdminModule {}
