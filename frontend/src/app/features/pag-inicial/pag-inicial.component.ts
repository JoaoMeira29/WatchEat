import {AfterViewInit, Component} from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pag-inicial.component.html',
  styleUrls: ['./pag-inicial.component.css']
})
export class PagInicialComponent implements AfterViewInit {
  conteudos: any[] = [];
  randomConteudos: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudos().subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
    this.conteudoDataService.getConteudosRandom10().subscribe((data: Object) => {
      this.randomConteudos = data as any[]; // Cast the data to an array type
    });
  }

  ngAfterViewInit(): void {
    const slidesContainer = document.getElementById("slidesContainer");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (slidesContainer && prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        slidesContainer.scrollLeft -= slidesContainer.clientWidth;
      });

      nextButton.addEventListener("click", () => {
        slidesContainer.scrollLeft += slidesContainer.clientWidth;
      });
    }
  }

  scrollSlides(direction: number): void {
    const slidesContainer = document.getElementById("slidesContainer");
    if (slidesContainer) {
      slidesContainer.scrollLeft += direction * slidesContainer.clientWidth;
    }
  }
}
