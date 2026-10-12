import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPagamentosComponent } from './pag-pagamentos.component';

describe('PaginaPagamentosComponent', () => {
  let component: PagPagamentosComponent;
  let fixture: ComponentFixture<PagPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagPagamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
