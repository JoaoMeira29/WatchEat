import {Component, ViewChild} from '@angular/core';
import { UsersDataService } from "../../shared/services/users/users-data.service";
import { LibraryDataService } from "../../shared/services/library/library-data.service";
import decode from 'jwt-decode';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
    private usersDataService: UsersDataService,
    private libraryDataService: LibraryDataService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    const currentUrl = this.router.url;
    const userId : string = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    this.usersDataService.getUserById(userId).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type
      this.currentUserId = this.user[0].Id;
    });
    this.libraryDataService.getLibraryTopMovies(userId).subscribe((data: Object) => {
      this.bibliotecaFilmes = data as any[]; // Cast the data to an array type
    });
    this.libraryDataService.getLibraryTopSeries(userId).subscribe((data: Object) => {
      this.bibliotecaSeries = data as any[]; // Cast the data to an array type
    });
    this.usersDataService.getUserTopFriendships(userId).subscribe((data: Object) => {
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

  deleteUser() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.usersDataService.deleteUser(tokenPayload.user[0].Id).subscribe();
    this.authService.LogoutUser();
  }
}
