import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import decode from "jwt-decode";
import {ContentDataService} from "../../shared/services/content/content-data.service";

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  submitted = false;
  newConteudoForm = this.formBuilder.group({
    TipoConteudo: '',
    Realizador: '',
    NTemporadas: '',
    NTEpisodios: '',
    Estado: '',
    DataFim: '',
    Nome: '',
    Direcao: '',
    Rating: '',
    Sinopse: '',
    DataReleased: '',
    Duracao: '',
    Trailer: '',
    Poster: '',
    GenerosInput: ''
  });

  constructor(
    private contentDataService: ContentDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.newConteudoForm = this.formBuilder.group({
      TipoConteudo: ['filmes', Validators.required],
      Realizador: ['', Validators.required],
      NTemporadas: ['', Validators.required],
      NTEpisodios: ['', Validators.required],
      Estado: ['', Validators.required],
      DataFim: ['', Validators.required],
      Nome: ['', Validators.required],
      Direcao: ['', Validators.required],
      Rating: ['', Validators.required],
      Sinopse: ['', Validators.required],
      DataReleased: ['', Validators.required],
      Duracao: ['', Validators.required],
      Trailer: ['', Validators.required],
      Poster: ['', Validators.required],
      GenerosInput: ['', Validators.required]
    });
  }

  isFilmesSelected(): boolean {
    return this.newConteudoForm.get('TipoConteudo')?.value === 'filmes';
  }

  isSeriesSelected(): boolean {
    return this.newConteudoForm.get('TipoConteudo')?.value === 'series';
  }

  onSubmit() {
    const generosInput = this.newConteudoForm.get('GenerosInput')?.value;
    const generosArray = generosInput?.split(';').map((genre: string) => genre.trim());

    // Create an array of objects for the generos
    const generos = generosArray?.map((genre: string) => {
      return { Nome: genre };
    });

    if (this.isFilmesSelected()) {
      console.log("olafilmes")
      this.contentDataService.addMovie(this.newConteudoForm, generos).subscribe(() => {
        window.location.reload();
      });
    }
    else if (this.isSeriesSelected()) {
      console.log("olaseries")
      this.contentDataService.addSeries(this.newConteudoForm, generos).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
