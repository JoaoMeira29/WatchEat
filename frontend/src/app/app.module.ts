import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LibraryComponent } from './features/library/library.component';
import { ProfileComponent } from './features/profile/profile.component';
import { MoviesComponent } from './features/movies/movies.component';
import { SeriesComponent } from './features/series/series.component';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ContentComponent } from './features/content/content.component';
import { ProductsComponent } from './features/products/products.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AddContentComponent } from './features/add-content/add-content.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { FriendsComponent } from './features/friends/friends.component';
import { PremiumComponent } from './features/premium/premium.component';
import { EditProfileComponent } from './features/edit-profile/edit-profile.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

import { AuthService } from './shared/services/auth/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'library', component: LibraryComponent, canActivate: [AuthService] },
      { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthService] },
      { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthService] },
      { path: 'add-content', component: AddContentComponent },
      { path: 'content/:id', component: ContentComponent, canActivate: [AuthService] },
      { path: 'payments', component: PaymentsComponent, canActivate: [AuthService] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthService] },
      { path: 'premium', component: PremiumComponent, canActivate: [AuthService] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthService] },
      { path: 'statistics', component: StatisticsComponent, canActivate: [AuthService] },
      { path: 'friends', component: FriendsComponent, canActivate: [AuthService] },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  declarations: [
    AppComponent,
    LibraryComponent,
    ProfileComponent,
    MoviesComponent,
    SeriesComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ContentComponent,
    ProductsComponent,
    PaymentsComponent,
    OrdersComponent,
    AddContentComponent,
    StatisticsComponent,
    FriendsComponent,
    PremiumComponent,
    EditProfileComponent,
    NotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
