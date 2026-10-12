import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagProdutosComponent } from './pag-produtos.component';

describe('PaginaProdutosComponent', () => {
  let component: PagProdutosComponent;
  let fixture: ComponentFixture<PagProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
