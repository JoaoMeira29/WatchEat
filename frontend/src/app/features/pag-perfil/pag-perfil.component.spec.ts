import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPerfilComponent } from './pag-perfil.component';

describe('PerfilComponent', () => {
  let component: PagPerfilComponent;
  let fixture: ComponentFixture<PagPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
