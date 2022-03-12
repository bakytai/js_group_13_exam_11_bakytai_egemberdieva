import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './store/users.reducer';
import { categoriesReducer } from './store/categories.reducer';
import { productsReducer } from './store/products.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { UsersEffects } from './store/users.effects';
import { CategoriesEffects } from './store/categories.effects';
import { ProductsEffects } from './store/products.effects';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ImagePipe } from './pipes/image.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { MatSelectModule } from '@angular/material/select';
import { FileInputComponent } from './ui/file-input/file-input.component';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CenteredCardComponent,
    ProductsComponent,
    RegisterComponent,
    LoginComponent,
    ImagePipe,
    NewProductComponent,
    ProductInfoComponent,
    FileInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    StoreModule.forRoot({users: userReducer, categories: categoriesReducer, products: productsReducer},
      {metaReducers}),
    EffectsModule.forRoot([UsersEffects, CategoriesEffects, ProductsEffects]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
