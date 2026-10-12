import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagAddConteudoComponent } from './pag-add-conteudo.component';

describe('PagAddConteudoComponent', () => {
  let component: PagAddConteudoComponent;
  let fixture: ComponentFixture<PagAddConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagAddConteudoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagAddConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
