import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagEstatisticasComponent } from './pag-estatisticas.component';

describe('PagEstatisticasComponent', () => {
  let component: PagEstatisticasComponent;
  let fixture: ComponentFixture<PagEstatisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagEstatisticasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagEstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
