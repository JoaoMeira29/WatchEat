import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagSeriesComponent } from './pag-series.component';

describe('ListaSeriesComponent', () => {
  let component: PagSeriesComponent;
  let fixture: ComponentFixture<PagSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagSeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
