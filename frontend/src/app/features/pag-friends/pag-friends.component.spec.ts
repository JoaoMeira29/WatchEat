import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagFriendsComponent } from './pag-friends.component';

describe('PagFriendsComponent', () => {
  let component: PagFriendsComponent;
  let fixture: ComponentFixture<PagFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagFriendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
