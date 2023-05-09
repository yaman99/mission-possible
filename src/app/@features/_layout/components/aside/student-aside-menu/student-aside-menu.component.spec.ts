import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAsideMenuComponent } from './student-aside-menu.component';

describe('StudentAsideMenuComponent', () => {
  let component: StudentAsideMenuComponent;
  let fixture: ComponentFixture<StudentAsideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAsideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
