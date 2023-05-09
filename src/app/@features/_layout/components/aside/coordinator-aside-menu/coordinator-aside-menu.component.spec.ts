import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorAsideMenuComponent } from './coordinator-aside-menu.component';

describe('CoordinatorAsideMenuComponent', () => {
  let component: CoordinatorAsideMenuComponent;
  let fixture: ComponentFixture<CoordinatorAsideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorAsideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorAsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
