import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPremiumComponent } from './pag-premium.component';

describe('PagPremiumComponent', () => {
  let component: PagPremiumComponent;
  let fixture: ComponentFixture<PagPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagPremiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
