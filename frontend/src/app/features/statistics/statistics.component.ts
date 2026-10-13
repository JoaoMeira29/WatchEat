import { Component } from '@angular/core';
import {StatisticsDataService} from "../../shared/services/statistics/statistics-data.service";
import {StatisticsData} from "../../shared/interfaces/statistics-data";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  estatisticas: StatisticsData = {
    bestCont: [],
    worstCont: [],
    contMediaRating: [],
    top5Genres: []
  };

  constructor(
      private statisticsDataService: StatisticsDataService
  ) {}

  ngOnInit() {
    this.statisticsDataService.getStatistics().subscribe((data: any) => {
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
