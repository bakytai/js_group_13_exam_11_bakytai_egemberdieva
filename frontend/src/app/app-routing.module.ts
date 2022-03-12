import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new/product', component: NewProductComponent},
  {path: 'product/:id', component: ProductInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
