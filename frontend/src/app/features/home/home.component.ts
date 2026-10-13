import {Component} from '@angular/core';
import {ContentDataService} from "../../shared/services/content/content-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  conteudos: any[] = [];
  randomConteudos: any[] = [];
  // The title shown large at the top of the page
  featured: any = null;

  constructor(private conteudoDataService: ContentDataService) {}

  ngOnInit() {
    this.conteudoDataService.getContents().subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
    this.conteudoDataService.getRandomContents().subscribe((data: Object) => {
      this.randomConteudos = data as any[]; // Cast the data to an array type
      this.featured = this.randomConteudos[0] ?? null;
    });
  }

  selectFeatured(conteudo: any): void {
    this.featured = conteudo;
  }
}
