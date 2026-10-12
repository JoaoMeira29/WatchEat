import { Component } from '@angular/core';
import {EstatisticasDataService} from "../../_shared/services/Estatisticas/estatisticas-data.service";
import {EstatisticasData} from "../../_shared/interfaces/estatisticas-data";

@Component({
  selector: 'app-pag-estatisticas',
  templateUrl: './pag-estatisticas.component.html',
  styleUrls: ['./pag-estatisticas.component.css']
})
export class PagEstatisticasComponent {
  estatisticas: EstatisticasData = {
    bestCont: [],
    worstCont: [],
    contMediaRating: [],
    top5Genres: []
  };

  constructor(
      private estatisticasDataService: EstatisticasDataService
  ) {}

  ngOnInit() {
    this.estatisticasDataService.getEstatisticas().subscribe((data: any) => {
      this.estatisticas = data;
    });

  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generatePieChartStyle(): string {
    let gradient = '';
    let startDegree = 0;
    let totalFrequency = 0;

    for (let i = 0; i < this.estatisticas.top5Genres.length; i++) {
      const entry = this.estatisticas.top5Genres[i];
      totalFrequency += entry.Frequency;
    }

    for (let i = 0; i < this.estatisticas.top5Genres.length; i++) {
      const entry = this.estatisticas.top5Genres[i];
      const color = this.generateRandomColor();
      const degrees = Math.round((entry.Frequency * 360) / totalFrequency);
      const endDegree = startDegree + degrees;
      gradient += `${color} ${startDegree}deg ${endDegree}deg, `;
      startDegree = endDegree;
    }

    // Remove the last comma
    gradient = gradient.slice(0, -2);
    return `conic-gradient(${gradient})`;
  }
}
