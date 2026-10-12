import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagConteudoComponent } from './pag-conteudo.component';

describe('PaginaConteudoComponent', () => {
  let component: PagConteudoComponent;
  let fixture: ComponentFixture<PagConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagConteudoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
