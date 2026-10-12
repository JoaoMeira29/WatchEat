import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagFilmesComponent } from './pag-filmes.component';

describe('ListaFilmesComponent', () => {
  let component: PagFilmesComponent;
  let fixture: ComponentFixture<PagFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagFilmesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
