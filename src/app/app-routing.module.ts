import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';

import { LoginComponent } from './pages/login/login.component'
import { AuthGuard } from './guards/auth.guard';

import { UserManagerComponent } from './pages/admin/user-manager/user-manager.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home/products', pathMatch: 'full' },
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'products', component: ProductsListComponent },
      { path: 'product/:id', component: ProductDetailComponent},
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], 
        children: [
          { path: 'user-manager', component: UserManagerComponent }
      ]},
    ]
   },
   { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
