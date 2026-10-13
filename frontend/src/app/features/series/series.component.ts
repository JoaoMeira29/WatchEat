import { Component } from '@angular/core';
import {ContentDataService} from "../../shared/services/content/content-data.service";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  conteudosSeries: any[] = [];

  constructor(private conteudoDataService: ContentDataService) {}

  ngOnInit() {
    this.conteudoDataService.getSeries().subscribe((data: Object) => {
      this.conteudosSeries = data as any[];
    });
  }
}
