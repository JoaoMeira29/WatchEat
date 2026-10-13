import {Component} from '@angular/core';
import {ContentDataService} from "../../shared/services/content/content-data.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import decode from "jwt-decode";
import {LibraryDataService} from "../../shared/services/library/library-data.service";
import {GenresDataService} from "../../shared/services/genres/genres-data.service";
import {PremiumReviewsDataService} from "../../shared/services/premium-reviews/premium-reviews-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  conteudo: any[] = [];
  checkConteudo: any[] = [];
  generos: any[] = [];
  reviewP: any[] = [];
  private trustedTrailers = new Map<string, SafeResourceUrl | null>();
  isButtonLoading: boolean = false;
  currentUser : any = null;
  checkUserReviewPremium: any = null;
  newReviewPremiumForm = this.formBuilder.group({
    Rating: ['', [Validators.pattern(/^([0-9](\.[1-9])?|10)$/)]],
    Review: '',
  });

  constructor(
    private contentDataService: ContentDataService,
    private libraryDataService: LibraryDataService,
    private genresDataService: GenresDataService,
    private premiumReviewsDataService: PremiumReviewsDataService,
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

    this.contentDataService.getContentById(currentUrl).subscribe((data: Object) => {
      this.conteudo = data as any[];
    });

    this.libraryDataService.checkContentInLibrary(currentUrl, tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.checkConteudo = data as any[];
    });

    this.genresDataService.getGenresByContentId(currentUrl).subscribe((data: Object) => {
      this.generos = data as any[];
    });

    this.premiumReviewsDataService.getPremiumReviewsByContentId(currentUrl).subscribe((data: Object) => {
      this.reviewP = data as any[];
    });

    this.premiumReviewsDataService.getPremiumReviewsByUserIdAndContentId(tokenPayload.user[0].Id, currentUrl).subscribe((data: Object) => {
      this.checkUserReviewPremium = data as any[];
      console.log(this.checkUserReviewPremium)
    });
  }

  // The trailer address comes from the database, so it is only embedded when it
  // points to a known video host. The result is kept so the iframe is not reloaded
  // on every change detection.
  getTrustedUrl(url: string): SafeResourceUrl | null {
    if (!this.trustedTrailers.has(url)) {
      this.trustedTrailers.set(url, this.isAllowedTrailerUrl(url) ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null);
    }
    return this.trustedTrailers.get(url) ?? null;
  }

  private isAllowedTrailerUrl(url: string): boolean {
    const allowedHosts = ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'];
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' && allowedHosts.includes(parsed.hostname);
    } catch {
      return false;
    }
  }

  AddWatchList() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const currentUrl = this.router.url;

    this.isButtonLoading = true; // Set the loading state to true

    this.libraryDataService.addContentToLibrary(currentUrl, tokenPayload.user[0].Id).subscribe(() => {
      this.libraryDataService.checkContentInLibrary(currentUrl, tokenPayload.user[0].Id).subscribe((data: Object) => {
        this.checkConteudo = data as any[]; // Cast the data to an array type

        this.isButtonLoading = false; // Set the loading state back to false after receiving the response
      });
    });
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const currentUrl = this.router.url;
    this.premiumReviewsDataService.addPremiumReview(this.newReviewPremiumForm, tokenPayload.user[0].Id, currentUrl).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
}
