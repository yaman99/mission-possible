import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialLetterComponent } from './official-letter.component';

describe('OfficialLetterComponent', () => {
  let component: OfficialLetterComponent;
  let fixture: ComponentFixture<OfficialLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
