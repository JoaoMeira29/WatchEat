import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './pag-filmes.component.html',
  styleUrls: ['./pag-filmes.component.css']
})
export class PagFilmesComponent {
  conteudosFilmes: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudosFilmes().subscribe((data: Object) => {
      this.conteudosFilmes = data as any[]; // Cast the data to an array type
    });
  }
}
