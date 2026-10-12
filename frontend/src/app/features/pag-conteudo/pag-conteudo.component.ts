import {Component} from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import decode from "jwt-decode";
import {BibliotecaDataService} from "../../_shared/services/Bibliotecas/biblioteca-data.service";
import {GenerosDataService} from "../../_shared/services/Generos/generos-data.service";
import {ReviewPremiumDataService} from "../../_shared/services/ReviewsPremium/review-premium-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-pagina-conteudo',
  templateUrl: './pag-conteudo.component.html',
  styleUrls: ['./pag-conteudo.component.css']
})
export class PagConteudoComponent {
  conteudo: any[] = [];
  checkConteudo: any[] = [];
  generos: any[] = [];
  reviewP: any[] = [];
  urlLoaded = false;
  isButtonLoading: boolean = false;
  currentUser : any = null;
  checkUserReviewPremium: any = null;
  newReviewPremiumForm = this.formBuilder.group({
    Rating: ['', [Validators.pattern(/^([0-9](\.[1-9])?|10)$/)]],
    Review: '',
  });

  constructor(
    private conteudosDataService: ConteudosDataService,
    private bibliotecaDataService: BibliotecaDataService,
    private generosDataService: GenerosDataService,
    private reviewPremiumDataService: ReviewPremiumDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.currentUser = tokenPayload.user[0];
    const currentUrl = this.router.url;

    this.conteudosDataService.getConteudoById(currentUrl).subscribe((data: Object) => {
      this.conteudo = data as any[];
    });

    this.bibliotecaDataService.checkConteudoInBiblioteca(currentUrl, tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.checkConteudo = data as any[];
    });

    this.generosDataService.getGenerosByContId(currentUrl).subscribe((data: Object) => {
      this.generos = data as any[];
    });

    this.reviewPremiumDataService.getReviewsPremiumByContId(currentUrl).subscribe((data: Object) => {
      this.reviewP = data as any[];
    });

    this.reviewPremiumDataService.getReviewsPremiumByUserIdAndContId(tokenPayload.user[0].Id, currentUrl).subscribe((data: Object) => {
      this.checkUserReviewPremium = data as any[];
      console.log(this.checkUserReviewPremium)
    });
  }

  getTrustedUrl(url: string): SafeResourceUrl {
    if(!this.urlLoaded){
      this.urlLoaded = true;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return url;
  }

  AddWatchList() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const currentUrl = this.router.url;

    this.isButtonLoading = true; // Set the loading state to true

    this.bibliotecaDataService.addConteudoInBiblioteca(currentUrl, tokenPayload.user[0].Id).subscribe(() => {
      this.bibliotecaDataService.checkConteudoInBiblioteca(currentUrl, tokenPayload.user[0].Id).subscribe((data: Object) => {
        this.checkConteudo = data as any[]; // Cast the data to an array type

        this.isButtonLoading = false; // Set the loading state back to false after receiving the response
      });
    });
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const currentUrl = this.router.url;
    this.reviewPremiumDataService.addReviewsPremiumByContId(this.newReviewPremiumForm, tokenPayload.user[0].Id, currentUrl).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
}
