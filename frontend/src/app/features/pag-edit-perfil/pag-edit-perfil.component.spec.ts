import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagEditPerfilComponent } from './pag-edit-perfil.component';

describe('PagEditPerfilComponent', () => {
  let component: PagEditPerfilComponent;
  let fixture: ComponentFixture<PagEditPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagEditPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagEditPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
