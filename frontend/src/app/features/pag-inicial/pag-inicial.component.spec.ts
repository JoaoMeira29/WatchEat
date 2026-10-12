import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagInicialComponent } from './pag-inicial.component';

describe('PaginaInicialComponent', () => {
  let component: PagInicialComponent;
  let fixture: ComponentFixture<PagInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagInicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
