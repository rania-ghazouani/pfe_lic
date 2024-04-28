import { LayoutModule } from '@angular/cdk/layout';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
/* FormsModule */
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import {
  DialogCategComponent,
} from './category-list/dialog-categ/dialog-categ.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './forgot/dialog/dialog.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HeaderComponent } from './header/header.component';
import {
  DialogInterComponent,
} from './intervention/dialog-inter/dialog-inter.component';
import { InterventionComponent } from './intervention/intervention.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import {
  DialogConfComponent,
} from './product-list/dialog-conf/dialog-conf.component';
import {
  DialogProdComponent,
} from './product-list/dialog-prod/dialog-prod.component';
import { ProductListComponent } from './product-list/product-list.component';
import {
  DialogProfComponent,
} from './profil/dialog-prof/dialog-prof.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { authService } from './services/auth.service';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    DialogComponent,
    RegisterComponent,
    DashboardComponent,
    ProductListComponent,
    DialogProdComponent,
    NavigationComponent,
    ProfilComponent,
    InterventionComponent,
    HeaderComponent,
    DialogInterComponent,
    CategoryListComponent,
    DialogCategComponent,
    DialogProfComponent,
    DialogConfComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    //angular material
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatNativeDateModule,
    MatMenuModule,
    MatToolbarModule,
    MatSortModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  providers: [ authService, ProductService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[DialogComponent]
})
export class AppModule { }
