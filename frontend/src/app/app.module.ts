import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/_login/login.component';
import { RegisterComponent } from './features/_register/register.component';
import { PagBibliotecaComponent } from './features/pag-biblioteca/pag-biblioteca.component';
import { PagPerfilComponent } from './features/pag-perfil/pag-perfil.component';
import { PagFilmesComponent } from './features/pag-filmes/pag-filmes.component';
import { PagSeriesComponent } from './features/pag-series/pag-series.component';
import { PagInicialComponent } from './features/pag-inicial/pag-inicial.component';
import { HeaderComponent } from './_shared/components/header/header.component';
import { FooterComponent } from './_shared/components/footer/footer.component';
import { PagConteudoComponent } from './features/pag-conteudo/pag-conteudo.component';
import { PagProdutosComponent } from './features/pag-produtos/pag-produtos.component';
import { PagPagamentosComponent } from './features/pag-pagamentos/pag-pagamentos.component';
import { PagPedidosComponent } from './features/pag-pedidos/pag-pedidos.component';
import { PagAddConteudoComponent } from './features/pag-add-conteudo/pag-add-conteudo.component';
import { PagEstatisticasComponent } from './features/pag-estatisticas/pag-estatisticas.component';
import { PagFriendsComponent } from './features/pag-friends/pag-friends.component';
import { PagPremiumComponent } from './features/pag-premium/pag-premium.component';
import { PagEditPerfilComponent } from './features/pag-edit-perfil/pag-edit-perfil.component';
import { PagNotFoundComponent } from './_shared/components/pag-not-found/pag-not-found.component';

import { AuthService } from './_shared/services/_Auth/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
      { path: 'pagina-inicial', component: PagInicialComponent },
      { path: 'lista-filmes', component: PagFilmesComponent },
      { path: 'lista-series', component: PagSeriesComponent },
      { path: 'biblioteca', component: PagBibliotecaComponent, canActivate: [AuthService] },
      { path: 'perfil/:id', component: PagPerfilComponent, canActivate: [AuthService] },
      { path: 'editPerfil', component: PagEditPerfilComponent, canActivate: [AuthService] },
      { path: 'addConteudo', component: PagAddConteudoComponent },
      { path: 'conteudo/:id', component: PagConteudoComponent, canActivate: [AuthService] },
      { path: 'pagamentos', component: PagPagamentosComponent, canActivate: [AuthService] },
      { path: 'pedidos', component: PagPedidosComponent, canActivate: [AuthService] },
      { path: 'premium', component: PagPremiumComponent, canActivate: [AuthService] },
      { path: 'produtos', component: PagProdutosComponent, canActivate: [AuthService] },
      { path: 'estatisticas', component: PagEstatisticasComponent, canActivate: [AuthService] },
      { path: 'amigos', component: PagFriendsComponent, canActivate: [AuthService] },
      { path: '**', component: PagNotFoundComponent },
    ])
  ],
  declarations: [
    AppComponent,
    PagBibliotecaComponent,
    PagPerfilComponent,
    PagFilmesComponent,
    PagSeriesComponent,
    PagInicialComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    PagConteudoComponent,
    PagProdutosComponent,
    PagPagamentosComponent,
    PagPedidosComponent,
    PagAddConteudoComponent,
    PagEstatisticasComponent,
    PagFriendsComponent,
    PagPremiumComponent,
    PagEditPerfilComponent,
    PagNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
