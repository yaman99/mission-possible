import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerCenterAsideMenuComponent } from './career-center-aside-menu.component';

describe('CareerCenterAsideMenuComponent', () => {
  let component: CareerCenterAsideMenuComponent;
  let fixture: ComponentFixture<CareerCenterAsideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerCenterAsideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerCenterAsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
