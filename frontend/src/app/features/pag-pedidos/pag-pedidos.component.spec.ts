import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPedidosComponent } from './pag-pedidos.component';

describe('PaginaPedidosComponent', () => {
  let component: PagPedidosComponent;
  let fixture: ComponentFixture<PagPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
