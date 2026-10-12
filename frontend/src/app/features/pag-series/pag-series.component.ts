import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-lista-series',
  templateUrl: './pag-series.component.html',
  styleUrls: ['./pag-series.component.css']
})
export class PagSeriesComponent {
  conteudosSeries: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudosSeries().subscribe((data: Object) => {
      this.conteudosSeries = data as any[];
    });
  }
}
