import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';

// Import para consumo da API
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { UserManagerComponent } from './pages/admin/user-manager/user-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsListComponent,
    ProductDetailComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    AdminComponent,
    LoginComponent,
    UserManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
