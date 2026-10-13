import {AfterViewInit, Component} from '@angular/core';
import {ContentDataService} from "../../shared/services/content/content-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  conteudos: any[] = [];
  randomConteudos: any[] = [];

  constructor(private conteudoDataService: ContentDataService) {}

  ngOnInit() {
    this.conteudoDataService.getContents().subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
    this.conteudoDataService.getRandomContents().subscribe((data: Object) => {
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
