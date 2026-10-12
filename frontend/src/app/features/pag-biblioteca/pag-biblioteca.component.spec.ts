import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagBibliotecaComponent } from './pag-biblioteca.component';

describe('BibliotecaComponent', () => {
  let component: PagBibliotecaComponent;
  let fixture: ComponentFixture<PagBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagBibliotecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
