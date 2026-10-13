import { Component } from '@angular/core';
import {ContentDataService} from "../../shared/services/content/content-data.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  conteudosFilmes: any[] = [];

  constructor(private conteudoDataService: ContentDataService) {}

  ngOnInit() {
    this.conteudoDataService.getMovies().subscribe((data: Object) => {
      this.conteudosFilmes = data as any[]; // Cast the data to an array type
    });
  }
}
