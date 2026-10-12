import {Component, ViewChild} from '@angular/core';
import { UtilizadoresDataService } from "../../_shared/services/Utilizadores/utilizadores-data.service";
import { BibliotecaDataService } from "../../_shared/services/Bibliotecas/biblioteca-data.service";
import decode from 'jwt-decode';
import {Router} from "@angular/router";
import {AuthService} from "../../_shared/services/_Auth/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './pag-perfil.component.html',
  styleUrls: ['./pag-perfil.component.css']
})
export class PagPerfilComponent {
  currentUserId: number = 0;
  user: any[] = [];
  bibliotecaFilmes: any[] = [];
  bibliotecaSeries: any[] = [];
  userAmizades: any[] = [];
  showEditPerfilButton: boolean = true;
  showDeleteAccountButton: boolean = true;
  showAddFriendButton: boolean = true;
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element

  constructor(
    private utilizadoresDataService: UtilizadoresDataService,
    private bibliotecaDataService: BibliotecaDataService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    const currentUrl = this.router.url;
    const userId : string = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    this.utilizadoresDataService.getUtilizadorById(userId).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type
      this.currentUserId = this.user[0].Id;
    });
    this.bibliotecaDataService.getBibliotecaFilmesTop6ById(userId).subscribe((data: Object) => {
      this.bibliotecaFilmes = data as any[]; // Cast the data to an array type
    });
    this.bibliotecaDataService.getBibliotecaSeriesTop6ById(userId).subscribe((data: Object) => {
      this.bibliotecaSeries = data as any[]; // Cast the data to an array type
    });
    this.utilizadoresDataService.getUtilizadorAmizadeTop6(userId).subscribe((data: Object) => {
      this.userAmizades = data as any[]; // Cast the data to an array type
    });

    this.showEditPerfilButton = tokenPayload.user[0].Id == userId;
    this.showDeleteAccountButton = tokenPayload.user[0].Id == userId;
    this.showAddFriendButton = tokenPayload.user[0].Id != userId;
  }

  openModal() {
    this.staticModal.nativeElement.classList.remove('hidden');
    this.staticModal.nativeElement.classList.add('flex');
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');
  }

  deleteUtilizador() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.utilizadoresDataService.deleteUtilizador(tokenPayload.user[0].Id).subscribe();
    this.authService.LogoutUser();
  }
}
